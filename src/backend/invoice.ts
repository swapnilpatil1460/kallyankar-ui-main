import api from "./api";

export const getInvoiceNumber = async () => {
  const { data } = await api.get<{ invoice_number: number }>("/invoice");
  return data;
};

export const postIncreamentInvoiceNumber = async () => {
  const { data } = await api.post<{ invoice_number: number }>("/invoice");
  console.log(data);
  return data;
};
