"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "thumbs",
      [
        {
          user_Id: 1,
          content_Id: 1,
        },
        {
          user_Id: 1,
          content_Id: 2,
        },
        {
          user_Id: 2,
          content_Id: 3,
        },
        {
          user_Id: 3,
          content_Id: 4,
        },
        {
          user_Id: 4,
          content_Id: 5,
        },
        {
          user_Id: 5,
          content_Id: 6,
        },
        {
          user_Id: 2,
          content_Id: 7,
        },
        {
          user_Id: 5,
          content_Id: 8,
        },
        {
          user_Id: 1,
          content_Id: 9,
        },
        {
          user_Id: 3,
          content_Id: 10,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("thumbs", null, {});
  },
};
