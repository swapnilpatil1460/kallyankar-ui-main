import React, { Fragment, useMemo, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dialog, Transition } from "@headlessui/react";
import useAppContext from "../../../hooks/useAppContext";
import PaymentStatus from "./PaymentStatus";
import { postCheckout } from "../../../backend/billing";
import { getCustomerById } from "../../../backend/customer";
import useApiCall from "../../../hooks/useApiCall";
import InvoiceHeading from "./InvoiceHeading";
import CartItemsList from "./CartItemList";
import useAnimation from "../../../hooks/useAnimation";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { openWhatsApp } from "../../../utils/whatsapp.utils";

interface Props {
  open: boolean;
  closeCartHandler: () => void;
  customerId: string;
}

const CartItems: React.FC<Props> = ({ open, closeCartHandler, customerId }) => {
  const { state, dispatch } = useAppContext();
  const { storedCartItems, refreshEffect } = state;
  const [billStatus, setBillStatus] = useState("Paid");
  const contentRef = useRef<HTMLDivElement>(null);
  const [payment, setTotalAmount] = useState({ total: 0, gst: 0 });
  const [inputFieldAmount, setInputAmount] = useState(payment.total.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [exchangeBattery, setExchangeBattery] = useState(false);
  const [exchangeData, setExchangeData] = useState({ name: "", type: "", value: 0 });
  const { snackbarAnimation } = useAnimation();
  const params = useMemo(() => ({ id: customerId }), [customerId]);
  const { data: customer } = useApiCall(getCustomerById, params);

  const handleAmountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    const maxAmount = payment.total - 1;
    setInputAmount(
      amount === "" || parseInt(amount) <= maxAmount ? amount : inputFieldAmount
    );
  };

  const handleDirectDownload = async () => {
    if (contentRef.current) {
      try {
        const dataUrl = await toPng(contentRef.current, {
          cacheBust: true,
          quality: 1.0,
          backgroundColor: "#ffffff",
        });
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        
        const now = new Date();
        const dateStr = now.toLocaleDateString().replace(/\//g, "-");
        const timeStr = now.toLocaleTimeString().replace(/:/g, "-");
        const customerName = customer ? `${customer.name}_${customer.last_name}` : "Invoice";
        pdf.save(`${customerName}_${dateStr}_${timeStr}.pdf`);
      } catch (err) {
        console.error("Failed to generate PDF", err);
      }
    }
  };

  const saveAsPDFHandler = async (openWhatsAppChat = false) => {
    if (isSaving || storedCartItems.length === 0) return;
    setIsSaving(true);
    try {
      let amount = inputFieldAmount
        ? payment.total - parseInt(inputFieldAmount)
        : 0;
      amount = billStatus === "Paid" ? 0 : amount;
      
      const finalTotalAmount = payment.total - (exchangeBattery ? exchangeData.value : 0);

      await postCheckout(storedCartItems, {
        gst_amount: payment.gst,
        total_amount: finalTotalAmount,
        unpaid_amount: amount,
        bill_status: billStatus,
        customerId,
        exchange_discount: exchangeBattery ? exchangeData.value : 0,
        exchanged_batteries: exchangeBattery && exchangeData.value > 0 ? [{
          battery_name: exchangeData.name,
          amphere_size: exchangeData.type,
          quantity: 1,
          exchange_value: exchangeData.value
        }] : []
      });

      await handleDirectDownload();

      if (openWhatsAppChat && customer) {
        const message = `Hello ${customer.name}, thank you for purchasing from Kalyankar Batteries! Your total bill is ₹${finalTotalAmount}. ${amount > 0 ? `Pending Amount: ₹${amount}.` : `Paid in full.`}`;
        openWhatsApp(customer.contact, message);
      }

      dispatch({ type: "ADD_STORED_CART_ITEMS", payload: [] });
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
      closeCartHandler();
      snackbarAnimation("Sale saved successfully", "success");
    } catch (err) {
      console.error("Error while saving record:", err);
      snackbarAnimation(
        "Sale could not be saved. Your cart has been kept so you can retry.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeCartHandler}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          ></span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-2" id="print" ref={contentRef}>
                <div className="border-2 border-gray-600 p-2">
                  {customer && <InvoiceHeading customer={customer} />}
                  <div className="flex w-full justify-center items-center">
                    <CartItemsList 
                      setTotal={setTotalAmount} 
                      exchangeDiscount={exchangeBattery ? exchangeData.value : 0} 
                    />
                  </div>

                  <div className="mt-10">
                    <div className="text-sm w-full flex justify-end pb-16">
                      <p className="font-medium text-sm px-8">
                        For Kalyankar Batteries
                      </p>
                    </div>

                    <div className="p-2 w-full flex justify-end">
                      <p className="font-bold text-sm border-t-2 border-slate-700 px-8 pt-2">
                        Authorized Signature
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="mb-4 italic text-[10px]">
                      <strong>Subject To Kolhapur Jurisdiction.</strong> I/We
                      hereby certify that my/our registration certificate under
                      the Maharashtra Value Added Tax Act 2002 is in force on
                      the date which the sale of goods specified in the tax
                      invoice is made by me/us and that the transaction of sale
                      covered by this Bill/Cash has been effect by me/us and it
                      shall be accounted for in the turnover of sales while
                      filing of return and the due tax if any payable of the
                      sale has been paid or shall be paid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left flex flex-col mt-6 px-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input type="checkbox" id="exchange" checked={exchangeBattery} onChange={(e) => setExchangeBattery(e.target.checked)} />
                  <label htmlFor="exchange" className="text-sm font-medium">Exchange Old Battery?</label>
                </div>
                {exchangeBattery && (
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0 mb-4 bg-gray-50 p-3 rounded-md">
                    <TextField label="Old Battery Name" size="small" value={exchangeData.name} onChange={(e) => setExchangeData({ ...exchangeData, name: e.target.value })} />
                    <TextField label="Ampere Size" size="small" value={exchangeData.type} onChange={(e) => setExchangeData({ ...exchangeData, type: e.target.value })} />
                    <TextField label="Exchange Value (₹)" type="number" size="small" value={exchangeData.value === 0 ? "" : exchangeData.value} onChange={(e) => setExchangeData({ ...exchangeData, value: parseInt(e.target.value) || 0 })} />
                  </div>
                )}
                <div className="flex justify-between">
                  <PaymentStatus
                    status={billStatus}
                    setStatus={setBillStatus}
                  />
                  {billStatus === "Unpaid" && (
                    <TextField
                      label="Amount In INR"
                      size="small"
                      onChange={handleAmountValueChange}
                      type="number"
                      value={inputFieldAmount}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={() => saveAsPDFHandler(false)}
                  disabled={isSaving || storedCartItems.length === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>{isSaving ? "Saving..." : "Save & Download"}</span>
                </button>
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-green-500 py-2 text-sm text-green-500 shadow-sm hover:bg-green-500 hover:text-white ml-2"
                  onClick={() => saveAsPDFHandler(true)}
                  disabled={isSaving || storedCartItems.length === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>{isSaving ? "Saving..." : "Save & WhatsApp"}</span>
                </button>
              </div>
              <div className="flex justify-end items-center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={closeCartHandler}
                >
                  Close
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartItems;
