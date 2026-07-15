import { useContext, useEffect, useRef, useState } from "react";
import { addPayment, getPaymentsByBillingId } from "../../backend/payment";
import InvoiceHeading from "../../components/UI/Cart/InvoiceHeading";
import Overlay from "../../components/UI/Overlay";
import { useAnimation } from "../../hooks";
import AppContext from "../../store/AppContext";
import { Billing, PaymentTransaction, Customer } from "../../store/type";
import SelectStatuRadio from "./SelectStatusRadio";
import { openWhatsApp } from "../../utils/whatsapp.utils";

type Props = {
  data: Billing;
  show: boolean;
  setHide: (val: boolean) => void;
};

const PayUnpaidAmount: React.FC<Props> = ({ data, show, setHide }) => {
  const { customer, unpaid_amount, _id } = data;
  const [status, setStatus] = useState("Paid");
  const [inputFieldAmount, setInputAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentHistory, setPaymentHistory] = useState<PaymentTransaction[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    state: { refreshEffect },
    dispatch,
  } = useContext(AppContext);
  const { spinnerAnimationStart, spinnerAnimationStop, snackbarAnimation } =
    useAnimation();

  useEffect(() => {
    setInputAmount(unpaid_amount.toString());
    const fetchHistory = async () => {
      if (_id) {
        try {
          const history = await getPaymentsByBillingId(_id);
          setPaymentHistory(history);
        } catch (e) {
          console.error("Failed to fetch payment history", e);
        }
      }
    };
    if (show) {
      fetchHistory();
    }
  }, [unpaid_amount, _id, show]);

  const handleAmountValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputAmount = e.target.value;
    if (inputAmount === "") {
      setInputAmount(() => "");
    } else if (parseInt(inputAmount) > unpaid_amount) {
      setInputAmount((prev: string) => prev);
    } else {
      setInputAmount(() => inputAmount);
    }
  };
  const hideModule = () => {
    setHide(false);
  };

  const togglePaymentStatus = (status: string) => {
    console.log({ status });
    if (status === "Paid") {
      setInputAmount(unpaid_amount.toString());
    }
    setStatus(status);
  };

  const handleDirectDownload = async () => {
    if (contentRef.current) {
      try {
        const { toPng } = await import("html-to-image");
        const { default: jsPDF } = await import("jspdf");
        
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
        pdf.save(`${customer?.name ?? "Invoice"}_${dateStr}_${timeStr}_bill.pdf`);
      } catch (err) {
        console.error("Failed to generate PDF", err);
      }
    }
  };

  const updateCustomerPayment = async (openWhatsAppChat = false) => {
    spinnerAnimationStart();
    
    let custId = "";
    let custName = "Customer";
    let custPhone = "";
    if (typeof customer === "string") {
      custId = customer;
    } else if (customer) {
      custId = (customer as Customer)._id || "";
      custName = (customer as Customer).name || "Customer";
      custPhone = (customer as Customer).contact || "";
    }

    const pendingAmount = unpaid_amount - parseInt(inputFieldAmount);

    try {
      await addPayment({
        billing_id: _id,
        customer_id: custId,
        amount_paid: parseInt(inputFieldAmount),
        payment_method: paymentMethod
      });
      
      await handleDirectDownload();

      if (openWhatsAppChat && custPhone) {
        const message = `Hello ${custName}, we received your payment of ₹${inputFieldAmount} at Kalyankar Batteries. ${pendingAmount > 0 ? `Your remaining balance is ₹${pendingAmount}.` : `Your bill is now fully paid. Thank you!`}`;
        openWhatsApp(custPhone, message);
      }

      snackbarAnimation("Payment recorded successfully!", "success");
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
      hideModule();
    } catch (error) {
      console.error(error);
      snackbarAnimation("Failed to record payment", "error");
    } finally {
      spinnerAnimationStop();
    }
  };
  return (
    <Overlay open={show} handleClose={hideModule} widthSize="lg">
      {/* Printable Invoice Section */}
      <div className="p-8 bg-gray-100 w-full" id="print" ref={contentRef}>
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-md">
          <InvoiceHeading customer={customer} />
          <div className="w-full mt-8 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse overflow-hidden shadow-md rounded-md text-sm text-left">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="px-3 py-2">Total Amount</th>
                  <th className="px-3 py-2">Paid Amount</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Pending Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-gray-800">
                  <td className="px-3 py-2 border border-gray-300 font-semibold">
                    ₹ {unpaid_amount}
                  </td>
                  <td className="px-3 py-2 border border-gray-300 font-semibold text-green-700">
                    ₹ {inputFieldAmount === "" ? "0" : inputFieldAmount}
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    {new Date().toJSON().slice(0, 10)}
                  </td>
                  <td className="px-3 py-2 border border-gray-300 font-semibold text-red-600">
                    ₹ {inputFieldAmount === ""
                      ? unpaid_amount
                      : unpaid_amount - parseInt(inputFieldAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment History Khata */}
          {paymentHistory.length > 0 && (
            <div className="w-full mt-8 overflow-x-auto">
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">Past Payments (Khata)</h3>
              <table className="w-full min-w-[400px] border-collapse overflow-hidden border border-gray-200 rounded-md text-sm text-left">
                <thead className="bg-gray-100">
                  <tr className="text-gray-700">
                    <th className="px-3 py-2 border-b">Date</th>
                    <th className="px-3 py-2 border-b">Amount</th>
                    <th className="px-3 py-2 border-b">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((txn, idx) => (
                    <tr key={idx} className="bg-white text-gray-600">
                      <td className="px-3 py-2 border-b border-gray-200">
                        {new Date(txn.createdAt || "").toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-200 font-semibold text-green-600">
                        ₹ {txn.amount_paid}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-200">
                        {txn.payment_method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Payment Controls */}
      <div className="px-8 py-4 bg-white border-t border-gray-200">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">Payment Status</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <SelectStatuRadio setStatus={togglePaymentStatus} status={status} />
          {status === "Unpaid" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Enter Amount Paid (INR)
              </label>
              <input
                type="number"
                value={inputFieldAmount}
                onChange={handleAmountValueChange}
                placeholder="Enter amount"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-56"
              />
              <p className="text-xs text-gray-400">Max payable: ₹{unpaid_amount}</p>
            </div>
          )}
          {status === "Unpaid" && (
            <div className="flex flex-col gap-1 ml-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-40"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={() => updateCustomerPayment(false)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all"
        >
          Save & Print
        </button>
        <button
          onClick={() => updateCustomerPayment(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Save & WhatsApp
        </button>
        <button
          onClick={hideModule}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg shadow transition-all"
        >
          Close
        </button>
      </div>
    </Overlay>
  );
};

export default PayUnpaidAmount;
