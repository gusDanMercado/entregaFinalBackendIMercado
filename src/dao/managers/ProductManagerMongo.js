import { productModel } from "../models/product.model.js";
import mongoosePaginate from "mongoose-paginate-v2";
productSchema.plugin(mongoosePaginate);

export default class ProductManagerMongo {
  async getProducts({ limit = 10, page = 1, sort, query }) {
    const filter = query ? { category: query } : {};
    const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    const result = await productModel.paginate(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true,
    });

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = result;

    return {
      status: "success",
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/products?page=${prevPage}` : null,
      nextLink: hasNextPage ? `/products?page=${nextPage}` : null,
    };
  }

  async getProductById(id) {
    return productModel.findById(id).lean();
  }

  async addProduct(data) {
    return productModel.create(data);
  }

  async updateProduct(id, data) {
    return productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return productModel.findByIdAndDelete(id);
  }
}
