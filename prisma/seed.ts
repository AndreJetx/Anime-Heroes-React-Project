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
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ace.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ace.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Android 21",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-androide21.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-android21.gif",
      },

      {
        anime: "One Piece",
        name: "Apoo",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-apoo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-apoo.gif",
      },

      {
        anime: "Black Clover",
        name: "Asta",
        power: "styleswordsman",
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
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-boros.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-boros.gif",
      },

      {
        anime: "Bleach",
        name: "Byakuya",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-byakuya.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-byakuya.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cell",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cell.gif",
      },

      {
        anime: "Naruto",
        name: "Choji",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-choji.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-choji.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cooler",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cooler.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cooler.gif",
      },

      {
        anime: "One Piece",
        name: "Cracker",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cracker.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cracker.gif",
      },

      {
        anime: "One Piece",
        name: "Crocodile",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-crocodile.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-crocodile.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Cumber",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cumber.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-cumber.gif",
      },

      {
        anime: "Naruto",
        name: "Deidara",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-deidara.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-deidara.gif",
      },

      {
        anime: "One Piece",
        name: "Doflamingo",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-doflamingo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-doflamingo.gif",
      },

      {
        anime: "One Piece",
        name: "Enel",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-enel.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-enel.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Freeza",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-freeza.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-frieza.gif",
      },

      {
        anime: "Naruto",
        name: "Gaara",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gaara.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gaara.gif",
      },

      {
        anime: "Naruto",
        name: "Gai",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gai.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gai.gif",
      },

      {
        anime: "One Punch Man",
        name: "Garou",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-garou.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-garou.gif",
      },

      {
        anime: "One Punch Man",
        name: "Genos",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-genos.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-genos.gif",
      },

      {
        anime: "Fairy Tail",
        name: "Gildarts",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gildarts.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gildarts.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Gogeta",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gogeta.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gogeta.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Gohan",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gohan.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gohan.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Young Gohan",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gohanteen.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gohanteen.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Goku",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-goku.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-goku.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Goku Black",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gokublack.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-gokublack.gif",
      },

      {
        anime: "One Piece",
        name: "Hawkins",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hawkins.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hawkins.gif",
      },

      {
        anime: "Naruto",
        name: "Hidan",
        power: "SWORDSMAN",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hidan.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hidan.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Hit",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hit.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-hit.gif",
      },

      {
        anime: "Bleach",
        name: "Ichigo Full Bring",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ichigofullbring.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ichigofullbring.gif",
      },

      {
        anime: "Bleach",
        name: "Ichigo Shinigami Full Bring",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ichigoshinigamfullbring.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ichigoshinigamfullbring.gif",
      },

      {
        anime: "Bleach",
        name: "Ichigo True Shikai",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ichigotrueshikai.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-Ichigotrueshikai.gif",
      },

      {
        anime: "Naruto",
        name: "Itachi",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-itachi.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-itachi.gif",
      },

      {
        anime: "Yugioh",
        name: "Jaden",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jaden.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jaden.gif",
      },

      {
        anime: "Naruto",
        name: "Jiraya",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jiraya.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jiraya.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Jiren",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jiren.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-jiren.gif",
      },

      {
        anime: "Naruto",
        name: "Kakashi",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kakashi.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kakashi.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Kale",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kale.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kale.gif",
      },

      {
        anime: "Outros",
        name: "Karin",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-karin.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-karin.gif",
      },

      {
        anime: "One Piece",
        name: "Katakuri",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-katakuri.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-katakuri.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Kefla",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kefla.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kefla.gif",
      },

      {
        anime: "Naruto",
        name: "Kiba",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kiba.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kiba.gif",
      },

      {
        anime: "One Piece",
        name: "Eustass Kid",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kid.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kid.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Kid Boo",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kidboo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kidboo.gif",
      },

      {
        anime: "Naruto",
        name: "Killer Bee",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-killerbee.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-killerbee.gif",
      },

      {
        anime: "Naruto",
        name: "Kisame",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kisame.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kisame.gif",
      },

      {
        anime: "One Piece",
        name: "Borsalino",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kizaru.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kizaru.gif",
      },

      {
        anime: "Naruto",
        name: "Konan",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-konan.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-konan.gif",
      },

      {
        anime: "One Piece",
        name: "kuma",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kuma.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kuma.gif",
      },

      {
        anime: "One Piece",
        name: "Marshall D. Teach",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kurohige.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-kurohige.gif",
      },

      {
        anime: "One Piece",
        name: "Trafalgar Law",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-law.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-law.gif",
      },

      {
        anime: "Fairy Tail",
        name: "Laxus",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-laxus.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-laxus.gif",
      },

      {
        anime: "One Piece",
        name: "Rob Lucci",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-lucci.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-lucci.gif",
      },

      {
        anime: "One Piece",
        name: "Luffy",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-luffy.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-luffy.gif",
      },

      {
        anime: "One Piece",
        name: "Young Luffy",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-luffyyoung.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-luffyyoung.gif",
      },

      {
        anime: "One Piece",
        name: "Magellan",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-magellan.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-magellan.gif",
      },

      {
        anime: "One Piece",
        name: "Marco",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-marco.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-marco.gif",
      },

      {
        anime: "Naruto",
        name: "Minato",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-minato.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-minato.gif",
      },

      {
        anime: "One Piece",
        name: "Moria",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-moria.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-moria.gif",
      },

      {
        anime: "One Piece",
        name: "Nami",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-nami.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-nami.gif",
      },

      {
        anime: "Naruto",
        name: "Naruto",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-naruto.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-naruto.gif",
      },

      {
        anime: "Naruto",
        name: "Naruto Hokage",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-narutohokage.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-narutohokage.gif",
      },

      {
        anime: "Naruto",
        name: "Obito",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-obito.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-obito.gif",
      },

      {
        anime: "Naruto",
        name: "Young Obito",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-obitoyounh.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-obitoyoung.gif",
      },

      {
        anime: "Bleach",
        name: "Ogichi",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ogichi.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ogichi.gif",
      },

      {
        anime: "Naruto",
        name: "Pain",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-pain.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-pain.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Piccolo",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-piccolo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-piccolo.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Piccolo Daimaoh",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-piccolodaimaoh.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-piccolodaimaoh.gif",
      },

      {
        anime: "Naruto",
        name: "Raikage",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-raikage.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-raikage.gif",
      },

      {
        anime: "Naruto",
        name: "Rock Lee",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-rocklee.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-rocklee.gif",
      },

      {
        anime: "Fairy Tail",
        name: "Rogue",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-rogue.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-rogue.gif",
      },

      {
        anime: "Naruto",
        name: "Sai",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sai.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sai.gif",
      },

      {
        anime: "Naruto",
        name: "Sakura",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sakura.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sakura.gif",
      },

      {
        anime: "One Piece",
        name: "Sanji",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sanji.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sanji.gif",
      },

      {
        anime: "Naruto",
        name: "Sasuke",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sasuke.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sasuke.gif",
      },

      {
        anime: "Outros",
        name: "Shadow",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-shadow.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-shadow.gif",
      },

      {
        anime: "Naruto",
        name: "Shino",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-shino.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-shino.gif",
      },

      {
        anime: "Pokemon",
        name: "Snorlax",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-snorlax.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-snorlax.gif",
      },

      {
        anime: "Outros",
        name: "Sonic",
        power: "stylemartialartist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sonic.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sonic.gif",
      },

      {
        anime: "Fairy Tail",
        name: "Sting",
        power: "stylemage",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sting.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-sting.gif",
      },

      {
        anime: "Naruto",
        name: "Suigetsu",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-suigetsu.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-suigetsu.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Tapion",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-tapion.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-tapion.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Tenshinhan",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-tenshinhan.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-tenshinhan.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Toppo",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-toppo.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-toppo.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Trunks Super",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-trunks.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-trunkssuper.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Trunks DBZ",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-trunksDBZ.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-trunksDBZ.gif",
      },

      {
        anime: "Bleach",
        name: "Ulquiorra",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ulquiorra.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-ulquiorra.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Vegeta",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegeta.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegeta.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Vegeta Scouter",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegetascouter.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegetascouter.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Vegetto",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegetto.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-vegetto.gif",
      },

      {
        anime: "Naruto",
        name: "Yagura",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yagura.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yagura.gif",
      },

      {
        anime: "Bleach",
        name: "Yamamoto",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yamamoto.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yamamoto.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Yamcha",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yancha.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-yamcha.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Zamassu",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zamassu.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zamassu.gif",
      },

      {
        anime: "Dragon Ball Z",
        name: "Potara Zamassu",
        power: "stylemagicfist",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zamassufused.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-fusedzamassu.gif",
      },

      {
        anime: "Bleach",
        name: "Zaraki",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zaraki.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zaraki.gif",
      },

      {
        anime: "Bleach",
        name: "Zaraki TYBW",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zarakitybw.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zarakiTYBW.gif",
      },

      {
        anime: "One Piece",
        name: "Zoro",
        power: "styleswordsman",
        imageUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zoro.png",
        gifUrl: "https://animeheroes.s3.sa-east-1.amazonaws.com/card-zoro.gif",
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