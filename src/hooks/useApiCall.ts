import { useEffect, useState } from "react";
import useAppContext from "./useAppContext";

interface ApiCallResult<T> {
  data: T | null;
}

const useApiCall = <T, P>(
  apiFunction: (params: P) => Promise<T>,
  params: P
): ApiCallResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const { dispatch, state } = useAppContext();
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const response = await apiFunction(params);
        if (isMounted) {
          setData(response);
        }
      } catch (error) {
        if (isMounted && error instanceof Error) {
          // Handle error if needed
          dispatch({
            type: "SET_ERROR",
            payload: { hasError: true, message: error.message },
          });
        }
      } finally {
        // Any cleanup code if needed
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [apiFunction, params]);
  return { data };
};
export default useApiCall;
