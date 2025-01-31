import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  await prisma.character.create({
    data: {
      name: "teste",
      power: "teste",
      imageUrl: "https://animeheroes.s3.amazonaws.com/contact.gif",
      gifUrl: "https://animeheroes.s3.amazonaws.com/contact.gif",
    },
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
