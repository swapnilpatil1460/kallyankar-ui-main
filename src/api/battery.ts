import { api } from ".";
import { RequestConfig } from "../store/type";

export const batteryAllRequest: RequestConfig = {
  method: "GET",
  url: api.battery_GET,
};

export const batterySaveRequest: RequestConfig = {
  method: "POST",
  url: api.battery_POST,
};

export const batteryDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.battery_DELETE,
};

export const batteryUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.battery_PATCH,
};
