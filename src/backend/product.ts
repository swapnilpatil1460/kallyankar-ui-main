import api from "./api";

import { Product } from "../store/type";

interface ProductMsg {
  soldList: Product[];
  message: string;
}

const postNewProduct = async (product: Product) => {
  const { _id, ...newProduct } = product;
  const { data } = await api.post<Product>("product/post", newProduct);
  return data;
};
const updateProductById = async (product: Product, id: string) => {
  const { data } = await api.patch<Product>("product/update/" + id, product);
  return data;
};
const deleteProductById = async (id: string) => {
  const { data } = await api.delete<Product>("product/delete/" + id);
  return data;
};
const getProductList = async () => {
  const { data } = await api.get<any>("product");
  return data.soldList || data;
};
const getProductListToExport = async () => {
  const { data } = await api.get<any>("product/list-to-export");
  return data.soldList || data;
};
const getProductByCustomerId = async ({ id }: { id: string }) => {
  const { data } = await api.get<any>(
    "product/customer-specific-list/" + id
  );
  return data.soldList || data;
};

export {
  postNewProduct,
  updateProductById,
  deleteProductById,
  getProductList,
  getProductByCustomerId,
  getProductListToExport,
};
