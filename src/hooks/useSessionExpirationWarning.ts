import { useEffect, useRef } from "react";
import useAuthContext from "../auth-store/useAuthContext";
import useAppContext from "./useAppContext";
import useSessionManager from "./useSessionManagement";

const FIVE_MINUTES = 300 * 1000;
const useSessionExpirationWarning = () => {
  const { state } = useAuthContext();
  const { dispatch } = useAppContext();
  const { expiration_duration, isAuthenticated } = state;
  const { handleUserLogout } = useSessionManager();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateFunction = () => {
    console.log("Session has been started!");
    if (expiration_duration < new Date().getTime() + FIVE_MINUTES) {
      dispatch({
        type: "SET_ERROR",
        payload: { hasError: true, message: "Your session will expire soon" },
      });
    }

    if (expiration_duration < new Date().getTime()) {
      handleUserLogout();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateFunction();
      if (expiration_duration <= Date.now()) return;
      const delay = Math.max(0, expiration_duration - Date.now());
      timerRef.current = setTimeout(handleUserLogout, delay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [expiration_duration, isAuthenticated, handleUserLogout]);
};

export default useSessionExpirationWarning;
