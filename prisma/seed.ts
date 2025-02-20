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
        anime: "One Piece",
        name: "Ace",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ace.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ace.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Android 21",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-android21.gif",
      },

      {
        anime: "One Piece",
        name: "Apoo",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-apoo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-apoo.gif",
      },

      {
        anime: "Black Clover",
        name: "Asta",
        power: "Espadachim",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-asta.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-asta.gif",
      },
      

      {
        anime: "Dragon Ball Z",
        name: "Bardok",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardok.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-bardock.gif",
      },
      
      {
        anime: "One Punch Man",
        name: "Boros",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-boros.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-boros.gif",
      },

      {
        anime: "Bleach",
        name: "Byakuya",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-byakuya.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-byakuya.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cell",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.gif",
      },

      {
        anime: "Naruto",
        name: "Choji",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-choji.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-choji.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cooler",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cooler.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cooler.gif",
      },

      {
        anime: "One Piece",
        name: "Cracker",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cracker.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cracker.gif",
      },

      {
        anime: "One Piece",
        name: "Crocodile",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-crocodile.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-crocodile.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cumber",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cumber.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cumber.gif",
      },

      {
        anime: "Naruto",
        name: "Deidara",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-deidara.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-deidara.gif",
      },

      {
        anime: "One Piece",
        name: "Doflamingo",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-doflamingo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-doflamingo.gif",
      },

      {
        anime: "One Piece",
        name: "Enel",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-enel.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-enel.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Freeza",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-freeza.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-frieza.gif",
      },

      {
        anime: "Naruto",
        name: "Gaara",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gaara.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gaara.gif",
      },

      {
        anime: "Naruto",
        name: "Gai",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gai.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gai.gif",
      },

      {
        anime: "One Punch Man",
        name: "Garou",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-garou.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-garou.gif",
      },

      {
        anime: "One Punch Man",
        name: "Genos",
        power: "Guerreiro",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-genos.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-genos.gif",
      },

      {
        anime: "Fairy Tail",
        name: "Gildarts",
        power: "Mago",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gildarts.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gildarts.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Gogeta",
        power: "Mago De Batalha",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gogeta.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gogeta.gif",
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