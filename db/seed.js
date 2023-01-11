const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: '1234567890' },
    update: {},
    create: {
      id: '1234567890',
      email: 'email@example.com',
      hash: '$2a$12$7AS7POyqP6xc0stFrk1JUuFtF1aV/dWplTAI4s9KvG1QZdIW2H1q.',
    },
  });

  console.log(alice);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
