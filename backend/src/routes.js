const express = require("express");
const routes = express.Router();

const knex = require("./database");

function notNull(value, msg) {
  if (value === "" || value === null) {
    throw msg;
  }
}

// Routes Posts
routes.get("/posts", async (request, response) => {
  return knex("posts")
    .select("*")
    .orderBy("id")
    .then((post) => {
      return response.json(post);
    });
});

routes.post("/posts", (request, response) => {
  const post = { ...request.body };

  try {
    notNull(post.message, "Message not informed.");
    console.log("here");

    knex("posts")
      .insert(post)
      .then((_) => response.status(204).send())
      .catch((err) => response.status(500).send(err));
  } catch (msg) {
    response.status(400).send(msg);
  }
});

routes.get("/posts/:id", (request, response) => {
  knex("posts")
    .where({ id: request.params.id })
    .first()
    .then((post) => {
      return response.json(post);
    })
    .catch((err) => response.status(404).send(err));
});

routes.get("/posts/:id/comments", (request, response) => {
  knex("comments")
    .where({ postId: request.params.id })
    .then((comment) => {
      return response.json(comment);
    })
    .catch((err) => response.status(404).send(err));
});

routes.post("/posts/:id/comments", (request, response) => {
  const comment = { ...request.body };

  try {
    notNull(comment.comment, "Comment cannot be empty");

    knex("comments")
      .insert(comment)
      .then((_) => response.status(204).send())
      .catch((err) => response.status(500).send(err));
  } catch (msg) {
    response.status(400).send(msg);
  }
});

// Routes Comments
routes.get("/comments", async (request, response) => {
  return knex("comments")
    .select("*")
    .orderBy("id")
    .then((comment) => response.json(comment))
    .catch((err) => response.status(404).send(err));
});

routes.get("/comments/:id", (request, response) => {
  knex("comments")
    .where({ id: request.params.id })
    .first()
    .then((comment) => {
      return response.json(comment);
    })
    .catch((err) => response.status(404).send(err));
});

module.exports = routes;
