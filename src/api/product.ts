import { api } from ".";
import { RequestConfig } from "../store/type";

export const productAllRequest: RequestConfig = {
  method: "GET",
  url: api.product_GET,
};

export const productSaveRequest: RequestConfig = {
  method: "POST",
  url: api.product_POST,
};

export const productDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.product_DELETE,
};

export const productUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.product_PATCH,
};
