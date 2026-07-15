import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, Login } from "../../store/type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { postUserLogin } from "../../backend/user";

import useAnimation from "../../hooks/useAnimation";
import { LoginSchema } from "../../zod";
import { ERRORS } from "../../zod/zod_error";
import useAuthContext from "../../auth-store/useAuthContext";
import useSessionManagement from "../../hooks/useSessionManagement";
import { Mail, Lock, Loader2 } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { data, setValue } = useHandlevalueChange(user);
  const { dispatch } = useAppContext();
  const { snackbarAnimation } = useAnimation();
  const { handleUserLogin } = useSessionManagement();
  const { state: { isAuthenticated } } = useAuthContext();
  const { email, password } = data as Login;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const testValid = LoginSchema.safeParse({ email, password });
      if (!testValid.success) {
        const errors = testValid.error.flatten();
        const { email: emailErr, password: passErr } = errors.fieldErrors;
        emailErr && snackbarAnimation(ERRORS.EMAIL, "error");
        passErr && snackbarAnimation(ERRORS.PASSWORD, "error");
        return;
      }

      setIsLoading(true);
      const response = await postUserLogin(data as Login);
      snackbarAnimation("Succesfully Login", "success");
      dispatch({ type: "SET_LOADING", payload: false });
      const { token, user: loggedInUser, expiresIn } = response;
      handleUserLogin({ ...loggedInUser, token, expiration: expiresIn.toString() });
      navigate("/admin/dashboard");
    } catch (error) {
      snackbarAnimation("Username or password incorrect!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg leading-5 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1 transition-colors sm:text-sm"
            name="email"
            id="email"
            type="email"
            placeholder="admin@kallyankar.com"
            onChange={setValue}
            value={email}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg leading-5 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1 transition-colors sm:text-sm"
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            onChange={setValue}
            value={password}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-theme-c1 hover:bg-theme-c1-b focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-c1 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
              Authenticating...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
