require("dotenv").config();

module.exports = {
  development: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_development",
    host: "ec2-3-36-56-37.ap-northeast-2.compute.amazonaws.com",
    dialect: "mysql",
    port: "13306",
  },
  test: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_test",
    host: "ec2-3-36-56-37.ap-northeast-2.compute.amazonaws.com",
    dialect: "mysql",
    port: "13306",
  },
  production: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "jurimma_production",
    host: "ec2-3-36-56-37.ap-northeast-2.compute.amazonaws.com",
    dialect: "mysql",
    port: "13306",
  },
};
