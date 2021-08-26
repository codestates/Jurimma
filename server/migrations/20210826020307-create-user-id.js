"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contents", "user_Id", Sequelize.INTEGER);

    await queryInterface.addConstraint("contents", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "userIdFK",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("contents", "userIdFK");
    await queryInterface.removeColumn("contents", "user_Id");
  },
};
