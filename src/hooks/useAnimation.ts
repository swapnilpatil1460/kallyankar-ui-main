import { Severity } from "../store/type";
import { useCallback } from "react";
import useAppContext from "./useAppContext";

const useAnimation = () => {
  const { dispatch } = useAppContext();
  const snackbarAnimation = useCallback((message: string, severity: Severity) => {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message,
        severity,
      },
    });
  }, [dispatch]);
  const spinnerAnimationStart = useCallback(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
  }, [dispatch]);

  const spinnerAnimationStop = useCallback(() => {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }, [dispatch]);
  return {
    snackbarAnimation,
    spinnerAnimationStart,
    spinnerAnimationStop,
  };
};
export default useAnimation;
