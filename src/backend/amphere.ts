import { AmphareSize } from "../store/type";
import api from "./api";

const postNewAmphere = async (amphere: AmphareSize) => {
  const { size } = amphere;
  const { data } = await api.post<AmphareSize>("amphere/add", {
    size: size + " AH",
  });
  return data;
};
const updateAmphereById = async (amphere: AmphareSize, id: string) => {
  const { size } = amphere;
  const { data } = await api.patch<AmphareSize>("amphere/update/" + id, {
    size: size + " AH",
  });
  return data;
};
const deleteAmphereById = async (id: string) => {
  const { data } = await api.delete<AmphareSize>("amphere/delete/" + id);
  return data;
};
const getAmphereList = async () => {
  const { data } = await api.get<AmphareSize[]>("amphere");
  return data;
};

const getAmphereSizeById = async (id: string) => {
  const { data } = await api.get<AmphareSize>("amphere/seleted/" + id);
  return data;
};

export {
  postNewAmphere,
  updateAmphereById,
  deleteAmphereById,
  getAmphereList,
  getAmphereSizeById,
};

