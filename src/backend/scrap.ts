import api from "./api";
import { Scrap } from "../store/type";

const getScrapList = async () => {
  const { data } = await api.get<Scrap[]>("scrap/list");
  return data;
};

const deleteScrapById = async (id: string) => {
  const { data } = await api.delete<{ message: string; scrap: Scrap }>(
    `scrap/delete/${id}`
  );
  return data;
};

export { getScrapList, deleteScrapById };
