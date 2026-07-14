import { Edit } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import Nothing from "../Nothing";
import { CUSTOMER_TABLE_COLUMN } from "./columns";

type CustomerTableProps = {
  data: Customer[];
};

const CustomerTable: React.FC<CustomerTableProps> = ({ data }) => {
  const { dateFormater } = useDateFormater();
  const {
    dispatch,
    state: { isLoading },
  } = useAppContext();

  const editCustomerHandler = (id: string) => {
    const record = data.find((item) => item._id === id);
    if (record) {
      dispatch({
        type: "SET_FORM_PROPS",
        payload: {
          data: record,
          mode: "UPDATE_RECORD",
          type: "CUSTOMER",
          title: "Update Customer Record",
        },
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: true });
    }
  };
  const showNothing = !isLoading && data.length === 0;
  return (
    <div className="w-full overflow-hidden shadow-md rounded-md mt-5">
      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {CUSTOMER_TABLE_COLUMN.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row: Customer, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/customers/${row._id}`}
                    className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {row.name + " " + row.last_name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {row.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {row.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {row.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {row.gst_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {dateFormater(row.createdAt ?? "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => editCustomerHandler(row._id ?? "")}
                    className="text-indigo-600 hover:underline dark:text-indigo-400"
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

export default CustomerTable;
