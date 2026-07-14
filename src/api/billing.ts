import { api } from ".";
import { RequestConfig } from "../store/type";

export const billingAllRequest: RequestConfig = {
  method: "GET",
  url: api.billing_GET,
};

export const billingSaveRequest: RequestConfig = {
  method: "POST",
  url: api.billing_POST,
};

export const billingDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.billing_DELETE,
};

export const billingUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.billing_PATCH,
};
