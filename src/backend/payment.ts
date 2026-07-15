import api from "./api";
import { PaymentTransaction } from "../store/type";

const addPayment = async (paymentData: Partial<PaymentTransaction>) => {
  const { data } = await api.post<{ message: string; payment: PaymentTransaction }>(
    `payment/add`,
    paymentData
  );
  return data;
};

const getPaymentsByBillingId = async (billingId: string) => {
  const { data } = await api.get<PaymentTransaction[]>(`payment/billing/${billingId}`);
  return data;
};

export { addPayment, getPaymentsByBillingId };
