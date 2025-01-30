import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  name: String,
  power: String,
  imageUrl: String,
});

export default mongoose.models.Character || mongoose.model("Character", CharacterSchema);
