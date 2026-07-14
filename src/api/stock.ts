import { api } from ".";
import { RequestConfig } from "../store/type";

export const stockAllRequest: RequestConfig = {
  method: "GET",
  url: api.stock_GET,
};

export const stockSaveRequest: RequestConfig = {
  method: "POST",
  url: api.stock_POST,
};

export const stockDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.stock_DELETE,
};

export const stockUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.stock_PATCH,
};
