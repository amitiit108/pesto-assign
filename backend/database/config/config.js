/**
 * Database configuration object.
 * Contains configuration options for connecting to the database.
 */
module.exports = {
  // Database host. Defaults to "localhost" if not provided.
  host: process.env.DB_HOST || "localhost",
  // Database user. Defaults to "postgres" if not provided.
  user: process.env.DB_USER || "postgres",
  // Database password. Defaults to "postgres" if not provided.
  password: process.env.DB_PASSWORD || "postgres",
  // Database name. Defaults to "pesto" if not provided.
  database: process.env.DB_DATABASE || "pesto",
  // Database dialect. Always set to "postgres".
  dialect: "postgres",
  // Pool configuration for managing database connections.
  pool: {
    // Maximum number of connections in the pool. Defaults to 5.
    max: 5,
    // Minimum number of connections in the pool. Defaults to 0.
    min: 0,
    // Maximum time, in milliseconds, that a connection can be idle before being released. Defaults to 30000 (30 seconds).
    acquire: 30000,
    // Maximum time, in milliseconds, that a connection can be idle before being destroyed. Defaults to 10000 (10 seconds).
    idle: 10000
  }
};
