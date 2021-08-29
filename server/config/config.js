require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_development",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_test",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_production",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
};
