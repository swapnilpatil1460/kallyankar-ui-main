import { useEffect } from "react";
import { getAmphereList } from "../backend/amphere";
import { getBatteryList } from "../backend/battery";
import { getGSTList } from "../backend/gst";

import useAppContext from "./useAppContext";

import useAnimation from "./useAnimation";
import useAuthContext from "../auth-store/useAuthContext";

const useInitialFetch = () => {
  const { state: authState } = useAuthContext();
  const { isAuthenticated } = authState ?? false;

  const { dispatch, state } = useAppContext();
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { hasFetched } = state;

  useEffect(() => {
    (async () => {
      if (!hasFetched && isAuthenticated) {
        try {
          spinnerAnimationStart();
          snackbarAnimation("Loading Initial Data...", "success");
          const amphere = await getAmphereList();
          const gst = await getGSTList();
          const battery = await getBatteryList();
          dispatch({ type: "ADD_AMPHERE_VALUES", payload: amphere });
          dispatch({ type: "ADD_BATTERY_NAMES", payload: battery });
          dispatch({ type: "ADD_GST_VALUES", payload: gst });
          dispatch({ type: "HAS_INITIAL_FETCHED", payload: true });
          snackbarAnimation("Loaded Initial Data...", "success");
          spinnerAnimationStop();
        } catch (error) {
          spinnerAnimationStop();
          snackbarAnimation("Fail to load Initial Data...", "error");
          let message = "ERROR OCCURED!";
          if (error instanceof Error) {
            message = error.message;
          }
          dispatch({ type: "SET_ERROR", payload: { hasError: true, message } });
        }
      }
    })();
  }, [hasFetched, isAuthenticated, dispatch]);
};

export default useInitialFetch;
