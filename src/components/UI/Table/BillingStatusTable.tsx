import { IconSecurePaymentFill } from "../../navigation/NavLinkProps";
import PayUnpaidAmount from "../../../Pages/PaymentPage/PayUnpaidAmount";
import useDateFormater from "../../../hooks/useDateFormater";
import { useState } from "react";
import { Billing } from "../../../store/type";
import { BILLING_STATUS_COLUMN } from "./columns";
import Nothing from "../Nothing";
import { useAppContext } from "../../../hooks";

const BillingStatusTable: React.FC<{ data: Billing[]; status: string }> = ({
  data,
  status,
}) => {
  const { dateFormater } = useDateFormater();
  const [unpaidInfo, setUnpaidInfo] = useState<Billing | undefined>();
  const [showUnpaidModule, setShowUnpaidModule] = useState(false);
  const {
    state: { isLoading },
  } = useAppContext();
  const updateUnpaidAmount = (id: string) => {
    const to_update = data?.find((element: any) => element._id === id);
    setUnpaidInfo(to_update);
    setShowUnpaidModule(true);
  };

  const showNothing = !isLoading && data.length === 0;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-md">
      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {BILLING_STATUS_COLUMN.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-theme-c3">
            {data.map((row: Billing, index: number) => (
              <tr key={index}>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {row.customer?.name} {row.customer?.last_name}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {row.customer?.contact}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {row.gst_amount}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {row.total_amount}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {row.unpaid_amount}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  {dateFormater(row.createdAt ?? "")}
                </td>
                <td className="px-6 py-3 text-left text-xs   tracking-wider">
                  <button
                    onClick={() => updateUnpaidAmount(row._id ?? "")}
                    disabled={status === "Paid"}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                  >
                    <IconSecurePaymentFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {unpaidInfo && (
        <PayUnpaidAmount
          data={unpaidInfo}
          show={showUnpaidModule}
          setHide={setShowUnpaidModule}
        />
      )}
    </div>
  );
};

export default BillingStatusTable;
