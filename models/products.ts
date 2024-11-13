import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

interface ProductDocument {
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
}

const Product = models.Product<ProductDocument> || model('Product', ProductSchema);

export default Product;