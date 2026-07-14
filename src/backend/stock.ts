import { STOCK } from "../store/type";
import api from "./api";
type StockMsg = {
  message: string;
  list: STOCK[];
};

type STOCK_MSG = {
  message: string;
  stock: STOCK;
};
const postNewStock = async (stock: STOCK) => {
  const { data } = await api.post<STOCK>("stock/add", stock);
  return data;
};

const postCheckStockAvailability = async (name: string, type: string) => {
  const { data } = await api.post<STOCK_MSG>("stock/check-availability", {
    name,
    type,
  });
  return data.stock;
};
const updateStockById = async (stock: STOCK, id: string) => {
  const { data } = await api.patch<STOCK>("stock/update/" + id, stock);
  return data;
};
const deleteStockById = async (id: string) => {
  const { data } = await api.delete<STOCK>("stock/delete/" + id);
  return data;
};
const getStockList = async () => {
  const { data } = await api.get<StockMsg>("stock/list");
  return data.list;
};

const getStockById = async (id: string) => {
  const { data } = await api.get<STOCK>("stock/seleted/" + id);
  return data;
};

export {
  postNewStock,
  updateStockById,
  deleteStockById,
  getStockList,
  getStockById,
  postCheckStockAvailability,
};
