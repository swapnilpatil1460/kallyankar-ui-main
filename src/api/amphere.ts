import { api } from ".";
import { RequestConfig } from "../store/type";

const amphereAllRequest: RequestConfig = {
  method: "GET",
  url: api.amphere_GET,
};

const amphereSaveRequest: RequestConfig = {
  method: "POST",
  url: api.amphere_POST,
};

const amphereDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.amphere_DELETE,
};

const amphereUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.amphere_PATCH,
};

export {
  amphereAllRequest,
  amphereSaveRequest,
  amphereDeleteRequest,
  amphereUpdateRequest,
};
