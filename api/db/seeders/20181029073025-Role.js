/**
 * Author: Monty Khanna
 */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Role', [{ // eslint-disable-line
    name: 'SUPER_ADMIN',
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'ADMIN',
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'USER',
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'GUEST',
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),
  
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Role', null, {}), // eslint-disable-line
};
