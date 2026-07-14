import axios from "axios";
import { Login, User } from "../store/type";
import api from "./api";

type UserLogin = {
  user: User;
  token: string;
  expiresIn: number;
};

type UserList = {
  userList: User[];
  message: string;
};

const postNewUser = async (user: User) => {
  const { data } = await api.post<User>("admin/sign-up", user);
  return data;
};
const updateUserById = async (user: User, id: string) => {
  const { data } = await api.patch<User>("admin/sign-up/" + id, user);
  return data;
};
const deleteUserById = async (id: string) => {
  const { data } = await api.delete<User>("admin/delete/" + id);
  return data;
};
const getUserList = async () => {
  const { data } = await api.get<UserList>("admin/user_list");
  return data.userList;
};
const postLogoutUser = async (token: string, email: string) => {
  const { data } = await api.post<User>("admin/logout", { email, token });
  return data;
};

const postUserLogin = async (user: Login) => {
  const { data } = await axios.post<UserLogin>(
    "https://kallyankar-api-service.onrender.com/admin/login",
    user
  );
  return data;
};

export {
  postNewUser,
  updateUserById,
  deleteUserById,
  getUserList,
  postLogoutUser,
  postUserLogin,
};
