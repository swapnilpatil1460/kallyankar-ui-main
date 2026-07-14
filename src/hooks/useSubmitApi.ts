import { useCallback } from "react";
import useAppContext from "./useAppContext";
import useAnimation from "./useAnimation";

interface ApiCallResult<T> {
  data: T | null;
}

const useApiSubmit = () => {
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { dispatch } = useAppContext();

  const submitApi = useCallback(
    async <T>(apiFunction: () => Promise<T>): Promise<ApiCallResult<T>> => {
      try {
        spinnerAnimationStart();
        const response = await apiFunction();
        snackbarAnimation("Response Saved", "success");
        spinnerAnimationStop();
        return { data: response };
      } catch (error) {
        spinnerAnimationStop();
        let error_message = "Something went wrong";
        if (error instanceof Error) {
          error_message = error.message;
        }
        dispatch({
          type: "SET_ERROR",
          payload: { hasError: true, message: error_message },
        });
        return { data: null };
      }
    },
    [dispatch, snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop]
  );

  return { submitApi };
};

export default useApiSubmit;
