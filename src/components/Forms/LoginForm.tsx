import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, Login } from "../../store/type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import { postUserLogin } from "../../backend/user";

import useAnimation from "../../hooks/useAnimation";
import ButtonSave from "../UI/Button/ButtonSave";
import { LoginSchema } from "../../zod";
import { ERRORS } from "../../zod/zod_error";
import useAuthContext from "../../auth-store/useAuthContext";
import useSessionManagement from "../../hooks/useSessionManagement";

const LoginForm = () => {
  const navigate = useNavigate();
  const { data, setValue } = useHandlevalueChange(user);
  const { dispatch } = useAppContext();
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { restoreUserSession, handleUserLogin } = useSessionManagement();
  const {
    state: { isAuthenticated },
  } = useAuthContext();
  const { email, password } = data as Login;

  useEffect(() => {
    restoreUserSession();
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [restoreUserSession, isAuthenticated]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const testValid = LoginSchema.safeParse({ email, password });
      if (!testValid.success) {
        const errors = testValid.error.flatten();
        const { email, password } = errors.fieldErrors;
        email && snackbarAnimation(ERRORS.EMAIL, "error");
        password && snackbarAnimation(ERRORS.PASSWORD, "error");
        return;
      }

      spinnerAnimationStart();
      const response = await postUserLogin(data as Login);
      snackbarAnimation("Succesfully Login", "success");
      dispatch({ type: "SET_LOADING", payload: false });
      const { token, user, expiresIn } = response;
      handleUserLogin({ ...user, token, expiration: expiresIn.toString() });
      navigate("/admin/dashboard");
      spinnerAnimationStop();
    } catch (error) {
      spinnerAnimationStop();
      snackbarAnimation("Username or password incorrect!", "error");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="px-6 md:px-28 py-5 text-[#333300]"
    >
      <div className="mb-4 w-full">
        <label
          className="block mb-2 text-sm font-bold tracking-wide"
          htmlFor="email"
        >
          Admin Email.
        </label>
        <input
          className="w-full h-10 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline tracking-wide"
          name="email"
          id="email"
          type="text"
          placeholder="Email"
          onChange={setValue}
          value={email}
        />
      </div>
      <div className="mb-4 w-full">
        <label
          className="block mb-2 text-sm font-bold tracking-wide"
          htmlFor="password"
        >
          Admin Password.
        </label>
        <input
          className="w-full h-10 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline tracking-wide"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={setValue}
          value={password}
        />
      </div>
      <ButtonSave title="Login" />
    </form>
  );
};

export default LoginForm;
