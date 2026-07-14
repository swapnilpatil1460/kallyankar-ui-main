import { useEffect, useReducer } from "react";
import { AuthContextType, authReducer } from ".";
import { State } from "./types";
import React from "react";

const initial_state: State = {
  user: null,
  isAuthenticated: false,
  expiration_duration: 0,
  isSessionRestored: false,
};
export const AuthContext = React.createContext<AuthContextType>({
  state: initial_state,
  dispatch: () => null,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initial_state);

  useEffect(() => {
    const storedUser = localStorage.getItem("candidate");

    try {
      if (!storedUser) return;

      const user: State["user"] = JSON.parse(storedUser);
      const expiration = user ? new Date(user.expiration).getTime() : NaN;
      if (!user?.token || Number.isNaN(expiration) || expiration <= Date.now()) {
        localStorage.removeItem("candidate");
        return;
      }

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      dispatch({ type: "SET_SESSION_EXPIRATION", payload: expiration });
    } catch {
      localStorage.removeItem("candidate");
    } finally {
      dispatch({ type: "SET_SESSION_RESTORED", payload: true });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
