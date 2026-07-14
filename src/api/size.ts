import { api } from ".";
import { RequestConfig } from "../store/type";

export const sizeAllRequest: RequestConfig = {
  method: "GET",
  url: api.size_GET,
};

export const sizeSaveRequest: RequestConfig = {
  method: "POST",
  url: api.size_POST,
};

export const sizeDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.size_DELETE,
};

export const sizeUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.size_PATCH,
};
