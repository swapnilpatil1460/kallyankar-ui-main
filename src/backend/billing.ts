import api from "./api";

import { Billing, BillingWithMessage, Product } from "../store/type";

interface PaymentMsg {
  billingList: Billing[];
  message: string;
}

const postNewBilling = async (billing: Billing) => {
  const { data } = await api.post<Billing>("billing/add", {
    ...billing,
    customer: billing.customerId,
  });
  return data;
};
const postCheckout = async (products: Product[], billing: Billing) => {
  const { data } = await api.post("billing/checkout", { products, billing });
  return data;
};
const updateBillingById = async (billing: Billing, id: string) => {
  const { data } = await api.patch<Billing>("billing/update/" + id, billing);
  return data;
};
const deleteBillingById = async (id: string) => {
  const { data } = await api.delete<Billing>("billing/delete/" + id);
  return data;
};
const getBillingById = async (id: string) => {
  const { data } = await api.get<Billing>(
    "billing/customer-specific-list/" + id
  );
  return data;
};
const getBillingList = async () => {
  const { data } = await api.get<PaymentMsg>("billing/get-list");
  return data.billingList;
};
const getBillingListByStatus = async ({ status }: { status: string }) => {
  const { data } = await api.get<BillingWithMessage>(
    "billing/get-list-by-status/" + status
  );
  return data.billingList;
};

export {
  postNewBilling,
  postCheckout,
  updateBillingById,
  deleteBillingById,
  getBillingList,
  getBillingListByStatus,
  getBillingById,
};
