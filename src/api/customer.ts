import { api } from ".";
import { RequestConfig } from "../store/type";

export const customerAllRequest: RequestConfig = {
  method: "GET",
  url: api.customer_GET,
};

export const customerSaveRequest: RequestConfig = {
  method: "POST",
  url: api.customer_POST,
};

export const customerDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.customer_DELETE,
};

export const customerUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.customer_PATCH,
};
