/**
 * Author: Monty Khanna
 */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{ // eslint-disable-line
    role_id: 1,
    first_name: 'Monty',
    last_name: 'Khanna',
    status: 1,
    username: 'mack',
    password: '$2b$10$4bheH69Z5c2LSX.KuNVmX.Oi2NjKl1QqHWQZCirJ6ImwQPBcIhuLu', // bohemia
    email: 'montykhanna007@hotmail.com',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    role_id: 2,
    first_name: 'Nitesh',
    last_name: 'Kachroo',
    status: 1,
    username: 'nick',
    password: '$2b$10$4bheH69Z5c2LSX.KuNVmX.Oi2NjKl1QqHWQZCirJ6ImwQPBcIhuLu', // bohemia
    email: 'niteshkac@gmail.com',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    role_id: 3,
    first_name: 'Harsimran',
    last_name: 'Singh',
    status: 1,
    username: 'simran',
    password: '$2b$10$4bheH69Z5c2LSX.KuNVmX.Oi2NjKl1QqHWQZCirJ6ImwQPBcIhuLu', // bohemia
    email: 'simr.web@gmail.com',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),
  
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {}), // eslint-disable-line
};
