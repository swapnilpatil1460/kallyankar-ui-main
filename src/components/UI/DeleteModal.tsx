import React, { useContext } from "react";
import { deleteAmphereById } from "../../backend/amphere";
import { deleteBatteryById } from "../../backend/battery";
import { deleteCustomerById } from "../../backend/customer";
import { deleteGSTById } from "../../backend/gst";
import { deleteStockById } from "../../backend/stock";
import { deleteUserById } from "../../backend/user";
import { useAnimation } from "../../hooks";

import AppContext from "../../store/AppContext";
import Overlay from "./Overlay";

const DeleteModal: React.FC<{
  open: boolean;
  children: React.ReactNode;
}> = ({ open, children }) => {
  const { state, dispatch } = useContext(AppContext);
  const { mode, title, id } = state.deleteModalProps;
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const handleDeleteRecord = async () => {
    try {
      spinnerAnimationStart();
      switch (mode) {
        case "AMPHERE":
          await deleteAmphereById(id);
          break;
        case "BATTERY_NAME":
          await deleteBatteryById(id);
          break;
        case "GST":
          await deleteGSTById(id);
          break;
        case "STOCK":
          await deleteStockById(id);
          break;
        case "CUSTOMER":
          await deleteCustomerById(id);
          break;
        case "USER":
          await deleteUserById(id);
        default:
          snackbarAnimation("invailid delete type", "warning");
      }
      snackbarAnimation("Record deleted successfully", "success");
    } catch (e) {
      snackbarAnimation("Error occured while deleting record!", "error");
    }
    spinnerAnimationStop();

    dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: false });
    dispatch({ type: "REFRESH_EFFECT", payload: !state.refreshEffect });
  };

  const handleExit = () => {
    dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: false });
    dispatch({
      type: "ADD_DELETE_MODAL_PROPS",
      payload: {
        id: "",
        mode: undefined,
        title: "",
      },
    });
  };
  return (
    <>
      <Overlay open={open} handleClose={() => {}}>
        <div className="flex w-[450px] items-center justify-center bg-white text-black  p-5 border-b border-solid border-slate-200 rounded-t">
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-between items-center w-full">
              <button
                type="button"
                onClick={handleDeleteRecord}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                onClick={handleExit}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Overlay>
      {children}
    </>
  );
};

export default DeleteModal;
