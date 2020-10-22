exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.text("message");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
