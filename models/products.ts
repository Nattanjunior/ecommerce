import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

export interface SchemaProps {
  _id: string
  name: string,
  description: string,
  price: number,
  category: string,
  picture: string,
}

const Product = models.Product<SchemaProps> || model('Product', ProductSchema);

export default Product;