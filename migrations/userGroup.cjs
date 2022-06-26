module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userGroup', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userIds: {
        type: Sequelize.STRING(255)
      },
      groupId: {
        type: Sequelize.STRING(255)
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('userGroup');
  }
}
