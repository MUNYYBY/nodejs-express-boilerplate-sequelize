const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('12345678', 10); // Replace 'your_password_here' with the actual password

  await prisma.user.create({
    data: {
      name: 'Your Name',
      email: 'info@logicleaps.com',
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true, // Change to false if the email is not verified
    },
  });

  console.log('User Seeded successfully');
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
