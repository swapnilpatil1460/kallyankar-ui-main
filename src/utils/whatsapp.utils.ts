export const formatPhoneNumber = (phone: string | undefined): string => {
  if (!phone) return "";
  let cleanPhone = phone.replace(/\D/g, "");
  // If it's a 10 digit Indian number without country code, add 91
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }
  return cleanPhone;
};

export const generateWhatsAppLink = (phone: string | undefined, message: string): string => {
  const cleanPhone = formatPhoneNumber(phone);
  if (!cleanPhone) return "";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (phone: string | undefined, message: string) => {
  const link = generateWhatsAppLink(phone, message);
  if (link) {
    window.open(link, "_blank");
  }
};
