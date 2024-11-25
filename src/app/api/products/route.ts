import { initMongoose } from "../../../../lib/mongoose";
import Product from "../../../../models/products";


export async function findAllProducts() {
  return Product.find().exec()
}

export async function GET(req: Request) {
  try {
    await initMongoose();
    const url = new URL(req.url)
    const ids = url.searchParams.get("ids")
    if (ids) {
      const idsArray = ids.split(',');
      const products = await Product.find({ '_id': { $in: idsArray } }).exec()
      return new Response(JSON.stringify(products), { status: 200 })
    } else {
      const products = await findAllProducts();
      return new Response(JSON.stringify(products), { status: 200, });
    }

  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return new Response(JSON.stringify({ message: "Erro ao obter produtos" }), { status: 500, });
  }
}