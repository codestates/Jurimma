"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "배윤수",
          email: "ownsgks@gmail.com",
          password: "yunsu12345",
          phone: "01012341234",
          userPic: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "김민재",
          email: "minjman2659@gmail.com",
          password: "minjman2659123",
          phone: "01012341234",
          userPic: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "이나은",
          email: "naeun@gmail.com",
          password: "naunendjfiasdf",
          phone: "01012341234",
          userPic: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "강영서",
          email: "kangg@gmail.com",
          password: "kangggg123",
          phone: "01012341234",
          userPic: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "권지용",
          email: "gdragon@gmail.com",
          password: "gdragon8888",
          phone: "01088888888",
          userPic: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
