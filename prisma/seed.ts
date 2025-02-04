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
        anime: "Dragon Ball Z",
        name: "Android 21",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.gif",
      },
      {
        anime: "Dragon Ball Z",
        name: "Bardok",
        power: "Lutador",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardok.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardok.gif",
      },
      {
        anime: "Dragon Ball Z",
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


// so funciona com npx tsx prisma/seed.ts