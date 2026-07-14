import { api } from ".";
import { RequestConfig } from "../store/type";

const userLoginRequest: RequestConfig = {
  method: "POST",
  url: api.user_Login,
};

const userSaveRequest: RequestConfig = {
  method: "POST",
  url: api.user_POST,
};

const userDeleteRequest: RequestConfig = {
  method: "DELETE",
  url: api.user_DELETE,
};

const userUpdateRequest: RequestConfig = {
  method: "PATCH",
  url: api.user_PATCH,
};

export {
  userLoginRequest,
  userSaveRequest,
  userDeleteRequest,
  userUpdateRequest,
};
