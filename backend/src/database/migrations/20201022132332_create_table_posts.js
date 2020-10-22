exports.up = (knex) => {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("message").notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("posts");
};
