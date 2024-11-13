import type { NextApiRequest, NextApiResponse } from "next";
import { initMongoose } from "../../../../lib/mongoose";
import Product from "../../../../models/products";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await initMongoose();
    const products = await Product.find().exec();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return new Response(JSON.stringify({ message: "Erro ao obter produtos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}