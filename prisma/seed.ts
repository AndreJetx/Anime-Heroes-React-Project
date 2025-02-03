import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [{
        name: "Android 21",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.amazonaws.com/card-android21.png",
        gifUrl: "https://animeheroes.s3.amazonaws.com/card-android21.gif",
      },

      {
      name: "Android 21",
      power: "Mago De Batalha",
      imageUrl: "https://animeheroes.s3.amazonaws.com/card-android21.png",
      gifUrl: "https://animeheroes.s3.amazonaws.com/card-android21.gif",
      },
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  //funcionou usando apenas o comando npx tsx prisma/seed.ts