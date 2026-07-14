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

  const handleUserLogin = useCallback(
    (user: User) => {
      const sessionExpirationDate = new Date(
        new Date().getTime() + parseInt(user.expiration) * 1000
      );
      const authenticatedUser = {
        ...user,
        expiration: sessionExpirationDate.toISOString(),
      };
      localStorage.setItem("candidate", JSON.stringify(authenticatedUser));

      dispatch({ type: "SET_USER", payload: authenticatedUser });
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
  }, [
    clearUserSession,
    snackbarAnimation,
    spinnerAnimationStart,
    spinnerAnimationStop,
    state.user,
  ]);

  return {
    handleUserLogin,
    handleUserLogout,
  };
};

export default useSessionManagement;
