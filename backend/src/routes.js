const express = require("express");
const routes = express.Router();

const knex = require("./database");

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

module.exports = routes;
