import { NextApiRequest, NextApiResponse } from "next";
import { prismaCliente } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const characters = await prismaCliente.character.findMany();
    res.status(200).json(characters);
  } 
  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"; 
    res.status(500).json({ message: "Erro ao buscar personagens", error: errorMessage });
  }  
  finally {
    await prismaCliente.$disconnect(); 
   }
}