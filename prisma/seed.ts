import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting data...');

  await prisma.character.deleteMany({});

  console.log('All existing characters deleted.');

  console.log('Seeding new characters...');

  await prisma.character.createMany({
    data: [
      {
        name: "Android 21",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.gif",
      },
      {
        name: "Bardok",
        power: "Lutador",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardok.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardok.gif",
      },
      {
        name: "Cell",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.gif",
      },
    ],
  });

  console.log('Data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
