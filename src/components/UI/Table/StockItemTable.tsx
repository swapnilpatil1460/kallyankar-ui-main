import { StockItems } from "../../../store/type";
import useDateFormater from "../../../hooks/useDateFormater";
import { Edit } from "lucide-react";
import Nothing from "../Nothing";
import { useAppContext } from "../../../hooks";
type Props = {
  data: StockItems[];
  udpateStockItem: (item: string) => void;
};

const StockItemTable: React.FC<Props> = ({ data, udpateStockItem }) => {
  const { dateFormater } = useDateFormater();
  const {
    state: { isLoading },
  } = useAppContext();
  const showNothing = !isLoading && data.length === 0;
  return (
    <div className="relative  shadow-md sm:rounded-lg  ">
      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
          <thead className="bg-indigo-600 text-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Added At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {data.map((row: StockItems, index: any) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-gray-700 font-normal hover:bg-gray-50 "
              >
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  {row.quantity}
                </td>
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  {dateFormater(row.updatedAt ?? "")}
                </td>
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  {" "}
                  <button
                    id={row._id}
                    onClick={(e) => udpateStockItem(row._id ?? "")}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockItemTable;
