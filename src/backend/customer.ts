import api from "./api";

import { Customer } from "../store/type";

interface CustomerPagination {
  customers: Customer[];
  currentPage: number;
  totalPages: number;
  totalCustomers: number;
}
const postNewCustomer = async (customer: Customer) => {
  const { data } = await api.post<Customer>("customer/new-customer", customer);
  return data;
};
const updateCustomerById = async (customer: Customer, id: string) => {
  const { data } = await api.patch<Customer>("customer/update/" + id, customer);
  return data;
};
const updateCustomerBillingStatus = async (customer: Customer, id: string) => {
  const { data } = await api.patch<Customer[]>(
    "customer/billing-status/" + id,
    customer
  );
  return data;
};
const deleteCustomerById = async (id: string) => {
  const { data } = await api.delete<Customer>("customer/delete/" + id);
  return data;
};
const getCustomerById = async ({ id }: { id: string }) => {
  const { data } = await api.get<Customer>("customer/seleted/" + id);
  return data;
};
const getCustomerByBillingStatus = async (status: string) => {
  const { data } = await api.get<Customer[]>(
    "customer/billing-status/" + status
  );
  return data;
};
const getCustomerList = async (p: any) => {
  const { refreshEffect, ...params } = p;
  const { data } = await api.get<CustomerPagination>("customer", {
    params,
  });
  return data;
};
const getCustomerListToExport = async () => {
  const { data } = await api.get<Customer[]>("customer/export");
  return data;
};

const logoutCustomer = async (token: string, email: string) => {
  const { data } = await api.post<Customer>("customer/logout", {
    email,
    token,
  });
  return data;
};

export {
  getCustomerById,
  postNewCustomer,
  updateCustomerById,
  deleteCustomerById,
  getCustomerList,
  logoutCustomer,
  getCustomerByBillingStatus,
  updateCustomerBillingStatus,
  getCustomerListToExport,
};
