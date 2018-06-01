'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ToDoStatus', [
    {
      done: 'No',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      done: 'Yes',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
},

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('ToDoStatus', null, {});
  }
};