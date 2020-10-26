const express = require("express");
const routes = express.Router();

const knex = require("./database");

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
    function notNull(value, msg) {
      if (value === "" || value === null) {
        throw msg;
      }
    }
    notNull(post.message, "Message not informed.");

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

// Routes Comments
routes.get("/comments", async (request, response) => {
  return knex("comments")
    .select("*")
    .orderBy("id")
    .then((comment) => response.json(comment))
    .catch((err) => response.status(404).send(err));
});

module.exports = routes;
