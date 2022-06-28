module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_group', {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      group_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        references: {
          model: 'groups',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_group');
  }
}
