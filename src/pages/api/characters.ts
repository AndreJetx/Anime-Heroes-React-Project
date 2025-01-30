import { connectToDatabase } from "../../utils/db";
import Character from "../../../models/Character";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { name, power, imageUrl } = req.body;
    const newCharacter = new Character({ name, power, imageUrl });
    await newCharacter.save();
    return res.status(201).json(newCharacter);
  }

  if (req.method === "GET") {
    const characters = await Character.find({});
    return res.status(200).json(characters);
  }

  res.status(405).json({ message: "Método não permitido" });
}
