"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "contents",
      [
        {
          wordName: "자만추",
          wordMean: "자연스러운 만남 추구",
          thumbsup: 0,
          user_Id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contents", null, {});
  },
};
