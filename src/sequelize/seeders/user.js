const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('12345678', 10); // Replace '12345678' with the actual password

    // Insert the user record
    await queryInterface.bulkInsert('Users', [
      {
        name: 'LogicLeaps',
        email: 'info@logicleaps.com',
        password: hashedPassword,
        phone: '123456789',
        role: 'admin',
        isEmailVerified: true,
        companyName: 'LogicLeaps',
        companyDomain: 'https://logicleaps.com',
        companyAddress: 'xyz',
        postalCode: '63100',
        city: 'BWP',
        country: 'PK',
        isBlock: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    // Delete the user record
    await queryInterface.bulkDelete('Users', { email: 'info@logicleaps.com' });
  },
};
