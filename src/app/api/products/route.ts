import type { NextApiRequest, NextApiResponse } from "next";
import { initMongoose } from "../../../../lib/mongoose";
import Product from "../../../../models/products";


export default async function findAllProducts() {
  return Product.find().exec()
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    await initMongoose();
    const products = await findAllProducts();

    return new Response(JSON.stringify(products), { status: 200, });
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return new Response(JSON.stringify({ message: "Erro ao obter produtos" }), { status: 500, });
  }
}