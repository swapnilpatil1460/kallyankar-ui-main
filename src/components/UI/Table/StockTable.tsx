import { Edit, Edit2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDateFormater from "../../../hooks/useDateFormater";
import { STOCK } from "../../../store/type";
import Nothing from "../Nothing";

type CustomerTableProps = {
  data: STOCK[];
};

const StockTable: React.FC<CustomerTableProps> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  const {
    dispatch,
    state: { isLoading },
  } = useAppContext();

  const editStockHandler = (id: string) => {
    const record = data.find((item) => item._id === id);
    console.log(record);
    if (record) {
      dispatch({
        type: "SET_FORM_PROPS",
        payload: {
          data: record,
          mode: "UPDATE_RECORD",
          type: "STOCK",
          title: "Update Stock Record",
        },
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: true });
    }
  };
  const showNothing = !isLoading && data.length === 0;
  return (
    <>
      <div className="relative   p-10">
        {showNothing ? (
          <Nothing
            heading="No Record"
            subHeading="Please add records to see..."
          />
        ) : (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Product Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Battery Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Amphere Size
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Available
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Date
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
              {data.map((row: STOCK, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50 "
                >
                  <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                    <Link
                      to={`/admin/stocks/${row._id}`}
                      className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {row.product_code}
                    </Link>
                  </td>

                  <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                    {row.battery_name}
                  </td>
                  <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                    {row.amphere_size}
                  </td>

                  <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                    <span>{row.available}</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                    <span>
                      {dateFormater(row.createdAt ?? new Date().toString())}
                    </span>
                  </td>
                  <td className="flex items-center px-4 py-4 space-x-2">
                    <button
                      onClick={() => editStockHandler(row._id ?? "")}
                      name={row._id}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                    >
                      <Edit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StockTable;
