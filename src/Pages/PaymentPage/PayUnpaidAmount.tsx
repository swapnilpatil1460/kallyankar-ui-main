import TextField from "@mui/material/TextField";

import { useContext, useEffect, useRef, useState } from "react";
import { updateBillingById } from "../../backend/billing";
import ButtonClick from "../../components/UI/Button/ButtonClick";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import InvoiceHeading from "../../components/UI/Cart/InvoiceHeading";
import Overlay from "../../components/UI/Overlay";
import { useAnimation } from "../../hooks";
import usePdfDownloader from "../../hooks/usePdfDownloader";
import AppContext from "../../store/AppContext";
import { Billing } from "../../store/type";
import SelectStatuRadio from "./SelectStatusRadio";

type Props = {
  data: Billing;
  show: boolean;
  setHide: (val: boolean) => void;
};

const PayUnpaidAmount: React.FC<Props> = ({ data, show, setHide }) => {
  const { customer, unpaid_amount, _id } = data;
  const [status, setStatus] = useState("Paid");
  const [inputFieldAmount, setInputAmount] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    state: { refreshEffect },
    dispatch,
  } = useContext(AppContext);
  const { spinnerAnimationStart, spinnerAnimationStop, snackbarAnimation } =
    useAnimation();

  useEffect(() => {
    setInputAmount(unpaid_amount.toString());
  }, [unpaid_amount]);

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

  const updateCustomerPayment = async () => {
    spinnerAnimationStart();
    const pendingAmount = unpaid_amount - parseInt(inputFieldAmount);
    const bill_status =
      unpaid_amount - parseInt(inputFieldAmount) === 0 ? "Paid" : "Unpaid";
    const body = { bill_status, unpaid_amount: pendingAmount };
    await updateBillingById(body, _id ?? "");
    
    await handleDirectDownload();

    spinnerAnimationStop();
    snackbarAnimation("Record Updated successfully! ", "success");
    dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    hideModule();
  };
  return (
    <Overlay open={show} handleClose={hideModule} widthSize="lg">
      <div className="p-8 bg-gray-100 w-full" id="print" ref={contentRef}>
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-md">
          <InvoiceHeading customer={customer} />
          <div className="w-full mt-8">
            <table className="w-full border-collapse overflow-hidden shadow-md rounded-md text-sm text-left">
              <thead>
                <tr className="bg-slate-500 text-white">
                  <th className="px-3 py-2">Total Amount</th>
                  <th className="px-3 py-2">Paid Amount</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Pending Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-gray-800">
                  <td className="px-3 py-2 border border-gray-300">
                    {unpaid_amount}
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    {inputFieldAmount === "" ? "0" : inputFieldAmount}
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    {new Date().toJSON().slice(0, 10)}
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    {inputFieldAmount === ""
                      ? unpaid_amount
                      : unpaid_amount - parseInt(inputFieldAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-left flex justify-left mt-6">
        <div className="flex justify-between items-center">
          <SelectStatuRadio setStatus={togglePaymentStatus} status={status} />
          {status === "Unpaid" && (
            <TextField
              label="Amount In INR"
              id="outlined-size-small"
              size="small"
              onChange={handleAmountValueChange}
              type="number"
              value={inputFieldAmount}
              className="focus:outline-none outline-none w-96 border-none"
              style={{ outline: "none", border: "none" }}
            />
          )}
        </div>
      </div>
      <div className="m-6 flex justify-end space-x-10">
        <ButtonHeader buttonClick={updateCustomerPayment} title="Print" />
        <ButtonHeader buttonClick={hideModule} title="Close" />
      </div>
    </Overlay>
  );
};

export default PayUnpaidAmount;
