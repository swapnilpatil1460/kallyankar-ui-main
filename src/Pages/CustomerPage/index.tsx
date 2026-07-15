import CustomerTable from "../../components/UI/Table/CustomerTable";

import { useEffect, useMemo, useRef, useState } from "react";
import { customer, Customer } from "../../store/type";

import useAppContext from "../../hooks/useAppContext";
import { useApiCall } from "../../hooks";
import TitleScreen from "../../components/UI/TitleScreen";
import { getCustomerList } from "../../backend/customer";
import Pagination from "./Pagination";
const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [val, setVal] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
    state: { refreshEffect },
    dispatch,
  } = useAppContext();

  const limit = 10;
  const params = useMemo(() => {
    return {
      refreshEffect,
    };
  }, [refreshEffect]);

  const { data } = useApiCall(getCustomerList, params);

  // Handle backend returning either array or paginated object
  const allCustomers = useMemo<Customer[]>(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as Customer[];
    if ((data as any).customers && Array.isArray((data as any).customers)) return (data as any).customers;
    return [];
  }, [data]);

  // Client-side search filtering
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return allCustomers;
    const lower = searchTerm.toLowerCase();
    return allCustomers.filter(c => 
      c.name?.toLowerCase().includes(lower) || 
      c.contact?.toString().includes(lower) ||
      c.last_name?.toLowerCase().includes(lower) ||
      c.email?.toLowerCase().includes(lower)
    );
  }, [allCustomers, searchTerm]);

  // Client-side pagination
  const totalPages = Math.ceil(filteredCustomers.length / limit) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredCustomers.slice(start, start + limit);
  }, [filteredCustomers, currentPage, limit]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = event.target.value;
    setVal(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchTerm(val);
      setCurrentPage(1);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  const handleResetInput = () => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setSearchTerm("");
    setVal("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addRecordFormHandler = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: customer,
        mode: "ADD_RECORD",
        type: "CUSTOMER",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };
  return (
    <div className="w-full bg-gray-50">
      <TitleScreen
        onAddRecord={() => addRecordFormHandler()}
        pageTitle="Customer details "
      />
      <div className="px-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-6 animate-fadeInUp">
          <input
            className="rounded-md w-80 tracking-wide px-4 py-2 text-sm text-gray-700 h-12 border-2 border-gray-300 placeholder-center focus:outline-none focus:shadow-lg focus:border-indigo-400 transition-all"
            type="text"
            placeholder="Search record based on name | contact"
            required
            onChange={handleSearchInputChange}
            value={val}
          />
          <button
            onClick={handleResetInput}
            className="w-full md:w-32 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all animate-pulse"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-6 bg-white  rounded-lg mt-6 animate-fadeIn">
        <CustomerTable data={paginatedCustomers} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
