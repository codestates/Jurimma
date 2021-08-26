require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
