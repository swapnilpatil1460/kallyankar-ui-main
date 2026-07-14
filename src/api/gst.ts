import { api } from ".";
import { RequestConfig } from "../store/type";

export const GSTAllRequest: RequestConfig = {
  method: "GET",
  url: api.GST_GET,
};

export const GSTSaveRequest: RequestConfig = {
  method: "POST",
  url: api.GST_POST,
};

export const GSTDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.GST_DELETE,
};

export const GSTUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.GST_PATCH,
};
