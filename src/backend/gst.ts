import { GSTValues } from "../store/type";
import api from "./api";

const postNewGST = async (gst: GSTValues) => {
  const { data } = await api.post<GSTValues>("gst/add", gst);
  return data;
};
const updateGSTById = async (gst: GSTValues, id: string) => {
  const { data } = await api.patch<GSTValues>("gst/update/" + id, gst);
  return data;
};
const deleteGSTById = async (id: string) => {
  const { data } = await api.delete<GSTValues>("gst/delete/" + id);
  return data;
};
const getGSTList = async () => {
  const { data } = await api.get<GSTValues[]>("gst");
  return data;
};

const getGSTById = async (id: string) => {
  const { data } = await api.get<GSTValues>("gst/seleted/" + id);
  return data;
};

export { postNewGST, updateGSTById, deleteGSTById, getGSTList, getGSTById };

