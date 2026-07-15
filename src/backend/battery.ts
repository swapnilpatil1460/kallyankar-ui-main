import { BatteryNameValues } from "../store/type";
import api from "./api";

const mid = "battery-type";
const postNewBattery = async (battery: BatteryNameValues) => {
  const { data } = await api.post<BatteryNameValues>(mid + "/add", battery);
  return data;
};
const updateBatteryById = async (battery: BatteryNameValues, id: string) => {
  const { data } = await api.patch<BatteryNameValues>(
    mid + "/update/" + id,
    battery
  );
  return data;
};
const deleteBatteryById = async (id: string) => {
  const { data } = await api.delete<BatteryNameValues>(mid + "/delete/" + id);
  return data;
};
const getBatteryList = async () => {
  const { data } = await api.get<BatteryNameValues[]>(mid);
  return data;
};

const getBatterySizeById = async (id: string) => {
  const { data } = await api.get<BatteryNameValues>(mid + "/seleted/" + id);
  return data;
};

export {
  postNewBattery,
  updateBatteryById,
  deleteBatteryById,
  getBatteryList,
  getBatterySizeById,
};

