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
    <div className=" bg-white dark:bg-gray-800 ">
      <div className=" p-6 flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0 md:space-x-8">
        <img src={invoiceLogo} alt="Invoice logo" className="w-52 h-auto" />
        <div className="text-right">
          <h2 className=" font-normal text-red-700  dark:text-gray-200 ">
            GSTN-27ARIPK2620F1Z2
          </h2>
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 uppercase">
            Shinde complex, main-road Gargoti
            <br />
            Bhudargad, Kolhapur, PIN: 416209
          </p>
          <p className="mt-2 text-xs text-red-700 dark:text-gray-400 uppercase">
            Contact: 9420007273, 7745047273
          </p>
        </div>
      </div>

      <div className=" px-6 mt-8 grid gap-6 md:grid-cols-2 border border-gray-300 shadow-md">
        <div className=" border-gray-300 border-r py-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Bill to:
          </h3>
          <p className="text-base font-medium text-gray-800 dark:text-gray-200">
            {customer?.name} {customer?.last_name}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Address: {customer?.address}
            <br />
            Contact: {customer?.contact}
            <br />
            GST Number: {customer?.gst_number ?? ""}
          </p>
        </div>

        <div className="text-right py-2">
          <dl className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-start space-x-4">
              <dt className="font-semibold text-gray-800 dark:text-gray-200">
                Billing date:
              </dt>
              <dd>{dateFormater(new Date().toString())}</dd>
            </div>
            <div className="flex justify-start space-x-4">
              <dt className="font-semibold text-gray-800 dark:text-gray-200">
                Invoice No:
              </dt>
              <dd>{`#${(data && data.invoice_number) ?? ""}`}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeading;
