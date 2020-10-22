module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "db_dev",
      user: "postgres",
      password: "123456",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
