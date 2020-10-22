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

module.exports = routes;
