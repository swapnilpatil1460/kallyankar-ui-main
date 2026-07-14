import { useCallback } from "react";
import { User } from "../auth-store/types";
import useAuthContext from "../auth-store/useAuthContext";
import { postLogoutUser } from "../backend/user";
import useAnimation from "./useAnimation";

const useSessionManagement = () => {
  const { dispatch, state } = useAuthContext();
  const { spinnerAnimationStart, spinnerAnimationStop, snackbarAnimation } =
    useAnimation();
  const clearUserSession = useCallback(() => {
    localStorage.removeItem("candidate");
    dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_SESSION_EXPIRATION", payload: 0 });
  }, [dispatch]);

  const restoreUserSession = useCallback(() => {
    const storedUser = localStorage.getItem("candidate");

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      const sessionExpirationTime = new Date(user.expiration).getTime();
      const currentTime = new Date().getTime();

      if (sessionExpirationTime < currentTime) {
        clearUserSession();
      } else {
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
        dispatch({
          type: "SET_SESSION_EXPIRATION",
          payload: sessionExpirationTime,
        });
      }
    }
  }, [clearUserSession, dispatch]);

  const handleUserLogin = useCallback(
    (user: User) => {
      const sessionExpirationDate = new Date(
        new Date().getTime() + parseInt(user.expiration) * 1000
      );
      user.expiration = sessionExpirationDate.toISOString();
      localStorage.setItem("candidate", JSON.stringify(user));

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      dispatch({
        type: "SET_SESSION_EXPIRATION",
        payload: sessionExpirationDate.getTime(),
      });
    },
    [dispatch]
  );

  const handleUserLogout = useCallback(async () => {
    spinnerAnimationStart();
    const { user } = state;
    if (user) {
      try {
        const { token, email } = user;
        await postLogoutUser(token, email);
      } catch (err) {
        console.log(err);
      }
    }
    spinnerAnimationStop(),
      snackbarAnimation("You have been logged out!", "success");
    clearUserSession();
  }, [clearUserSession]);

  return {
    restoreUserSession,
    handleUserLogin,
    handleUserLogout,
  };
};

export default useSessionManagement;
