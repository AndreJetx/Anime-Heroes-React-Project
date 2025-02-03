import { NextApiRequest, NextApiResponse } from "next";
import { priscaCliente } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const characters = await priscaCliente.character.findMany();
    res.status(200).json(characters);
  } 
  catch (error) {
    res.status(500).json({ message: "Erro ao buscar personagens", error: error.message });
  } 
  finally {
    await priscaCliente.$disconnect(); 
   }
}