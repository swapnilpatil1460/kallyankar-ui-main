import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import React from "react";
import invoiceLogo from "../../svg/InvoiceLogo.svg";
import { useApiCall } from "../../../hooks";
import { getInvoiceNumber } from "../../../backend/invoice";

const InvoiceHeading: React.FC<{ customer?: Customer }> = ({ customer }) => {
  const { dateFormater } = useDateFormater();
  const { data } = useApiCall(getInvoiceNumber, null);

  return (
    <div className="bg-white text-black p-4">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-black pb-4 mb-4">
        <div className="flex items-center">
          <img src={invoiceLogo} alt="Invoice logo" className="w-48 h-auto grayscale" />
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-black tracking-wide">TAX INVOICE</h2>
          <p className="font-semibold mt-1">GSTN: 27ARIPK2620F1Z2</p>
          <p className="mt-1 text-sm text-black uppercase">
            Shinde complex, main-road Gargoti<br />
            Bhudargad, Kolhapur, PIN: 416209
          </p>
          <p className="mt-1 text-sm font-semibold text-black">
            Contact: 9420007273, 7745047273
          </p>
        </div>
      </div>

      {/* Bill To & Invoice Info */}
      <div className="flex justify-between items-start mb-2">
        <div className="w-1/2">
          <h3 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 inline-block">
            Bill To:
          </h3>
          <p className="text-base font-bold text-black uppercase">
            {customer?.name} {customer?.last_name}
          </p>
          <p className="mt-1 text-sm text-black">
            {customer?.address}
          </p>
          <p className="text-sm text-black">
            Contact: {customer?.contact}
          </p>
          {customer?.gst_number && (
            <p className="text-sm text-black mt-1">
              <span className="font-semibold">GST No:</span> {customer.gst_number}
            </p>
          )}
        </div>

        <div className="w-1/3 border border-black p-3">
          <div className="flex justify-between mb-2 border-b border-black pb-2">
            <span className="font-semibold text-sm uppercase">Invoice No:</span>
            <span className="text-sm font-bold">#{data?.invoice_number ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm uppercase">Date:</span>
            <span className="text-sm">{dateFormater(new Date().toString())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeading;
