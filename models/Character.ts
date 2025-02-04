import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  anime: { type: String, required: true },
  name: { type: String, required: true },
  power: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.models.Character || mongoose.model("Character", CharacterSchema);
