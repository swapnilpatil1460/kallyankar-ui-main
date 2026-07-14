import { Severity } from "../store/type";
import useAppContext from "./useAppContext";

const useAnimation = () => {
  const { dispatch } = useAppContext();
  const snackbarAnimation = (message: string, severity: Severity) => {
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: {
        isOpen: true,
        message,
        severity,
      },
    });
  };
  const spinnerAnimationStart = () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
  };

  const spinnerAnimationStop = () => {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };
  return {
    snackbarAnimation,
    spinnerAnimationStart,
    spinnerAnimationStop,
  };
};
export default useAnimation;
