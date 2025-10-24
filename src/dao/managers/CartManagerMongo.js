import { cartModel } from "../models/cart.model.js";

export default class CartManagerMongo {
  async createCart() {
    return cartModel.create({ products: [] });
  }

  async getCartById(cid) {
    return cartModel.findById(cid).populate("products.product").lean();
  }

  async addProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const index = cart.products.findIndex((p) => p.product.toString() === pid);

    if (index === -1) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      cart.products[index].quantity++;
    }

    return cart.save();
  }

  async updateCart(cid, products) {
    return cartModel.findByIdAndUpdate(cid, { products }, { new: true });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    const item = cart.products.find((p) => p.product.toString() === pid);
    if (item) item.quantity = quantity;
    return cart.save();
  }

  async deleteProduct(cid, pid) {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    return cart.save();
  }

  async clearCart(cid) {
    return cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
  }
}
