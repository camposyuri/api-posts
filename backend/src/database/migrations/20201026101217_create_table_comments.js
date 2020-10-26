exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.string("comment");

    table.integer("postId").references("id").inTable("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
