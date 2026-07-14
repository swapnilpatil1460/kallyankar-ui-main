import { User } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewUser } from "../../backend/user";
import { useAnimation, useAppContext } from "../../hooks";
import ButtonHeader from "../UI/Button/ButtonHeader";
import useAuthContext from "../../auth-store/useAuthContext";
import { UserSchema } from "../../zod";
import { ERRORS } from "../../zod/zod_error";

const UserForm = () => {
  const { state, dispatch } = useAppContext();
  const { state: authState } = useAuthContext();
  const { refreshEffect, formProps } = state;
  const { data: user, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(user as User);
  const { name, last_name, email, role, password } = data as User;

  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = UserSchema.safeParse(data as User);

    if (!validate.success) {
      const errors = validate.error.flatten();
      const { name, password, last_name, role, email } = errors.fieldErrors;
      name && snackbarAnimation(ERRORS.NAME, "error");
      password && snackbarAnimation(ERRORS.PASSWORD, "error");
      last_name && snackbarAnimation(ERRORS.LAST_NAME, "error");
      email && snackbarAnimation(ERRORS.EMAIL, "error");
      return;
    }
    spinnerAnimationStart();
    try {
      const { user } = authState;
      await postNewUser({ ...data, createdBy: user?.email } as User);
      snackbarAnimation(ERRORS.SUCCESS, "success");
    } catch (err) {
      snackbarAnimation(ERRORS.FAILURE, "error");
    }
    spinnerAnimationStop();
    dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    dispatch({ type: "HIDE_SHOW_FORM", payload: false });
  };
  return (
    <div>
      <Heading heading="User Registration Form" />
      <div className="w-full  bg-white px-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                User Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="password"
                placeholder="User Name"
                onChange={setValue}
                value={name}
                required
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="l_name"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="l_name"
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={setValue}
                value={last_name}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              required
              onChange={setValue}
              id="email"
              name="email"
              placeholder="Username"
              value={email}
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              defaultValue={role}
              onChange={setValue}
              id="role"
              name="role"
            >
              <option value="DEFAULT">Choose a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              required
              onChange={setValue}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
            />
          </div>
          <div className="flex justify-end items-center">
            <ButtonHeader
              title="Register User"
              buttonClick={() => {}}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
