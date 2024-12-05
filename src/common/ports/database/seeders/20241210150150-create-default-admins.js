'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('managers', [
      {
        first_name: 'admin1',
        last_name: 'admin1',
        phone: '09140466901',
        national_code: '1273147499',
        birth_of_date: '1378-12-18',
        father_name: 'admin1',
        gender: 'MALE',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'admin2',
        last_name: 'admin2',
        phone: '09124798930',
        national_code: '0440475120',
        birth_of_date: '1378-12-18',
        father_name: 'admin2',
        gender: 'MALE',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('managers', null, {});
  },
};
