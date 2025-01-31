import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Definir modelo do personagem
const characterSchema = new mongoose.Schema({
  name: String,
  power: String,
  imageUrl: String,
  gifUrl: String,
});

const Character = mongoose.model("Character", characterSchema);

// Conectar ao MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Conectado ao MongoDB");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
}

// Criar os personagens para o banco
async function seedDatabase() {
  await connectDB();

  const characters = [
    {
      name: "Goku",
      power: "Kamehameha",
      imageUrl: "https://animeheroes.s3.amazonaws.com/goku.png",
      gifUrl: "https://animeheroes.s3.amazonaws.com/goku.gif",
    },
    {
      name: "Naruto",
      power: "Rasengan",
      imageUrl: "https://SEU_BUCKET.s3.amazonaws.com/naruto.png",
      gifUrl: "https://SEU_BUCKET.s3.amazonaws.com/naruto.gif",
    },
    {
      name: "Luffy",
      power: "Gear Fourth",
      imageUrl: "https://SEU_BUCKET.s3.amazonaws.com/luffy.png",
      gifUrl: "https://SEU_BUCKET.s3.amazonaws.com/luffy.gif",
    },
  ];

  try {
    // Limpar a coleção antes de adicionar novos personagens
    await Character.deleteMany({});
    console.log("Coleção limpa!");

    // Inserir personagens no banco
    await Character.insertMany(characters);
    console.log("Seed inserido com sucesso!");

    mongoose.connection.close();
    console.log("Conexão fechada.");
  } catch (error) {
    console.error("Erro ao inserir seed", error);
    mongoose.connection.close();
  }
}

// Executar o script
seedDatabase();
