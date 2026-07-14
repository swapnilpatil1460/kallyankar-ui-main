import AppReducer, { Dispatch } from "./index";
import {
  initialAmphere,
  initialBatteryNames,
  initialDeleteModalProps,
  initialFormProps,
  initialGST,
  initialStoredCartItems,
  State,
} from "./type";
import React, { createContext, useReducer } from "react";

type AppContextType = {
  state: State;
  dispatch: Dispatch;
};

const initialState: State = {
  GST: initialGST,
  batteryNames: initialBatteryNames,
  amphere: initialAmphere,
  storedCartItems: initialStoredCartItems,
  deleteModalProps: initialDeleteModalProps,
  formProps: initialFormProps,
  refreshEffect: false,
  isModalVisible: false,
  isDeleteModalVisible: false,
  error: { hasError: false, message: "" },
  isLoading: false,
  customer: [],
  snackbar: {
    isOpen: false,
    message: "",
    severity: "error",
  },
  auth: null,
  toggleForm: false,
  hasFetched: false,
};

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
