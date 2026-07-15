import { AmphareSize } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewAmphere, updateAmphereById } from "../../backend/amphere";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import { useAnimation } from "../../hooks";

const AmphereForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { formProps, amphere } = state;
  const { data: _amphere, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_amphere as AmphareSize);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { size, _id } = data as AmphareSize;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validSize = +size.toString().replace(/\D/g, "");
    if (validSize <= 0) {
      snackbarAnimation("Please enter value greater than zero", "error");
      return;
    }

    const itemIndex = amphere.findIndex(
      (emp) => emp.size.toString() === validSize + " AH"
    );
    if (itemIndex !== -1) {
      snackbarAnimation("Amphere size already exists!", "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (mode === "ADD_RECORD") {
        await postNewAmphere({ size: validSize } as AmphareSize);
      } else {
        await updateAmphereById(
          { ...data, size: validSize } as AmphareSize,
          _id ?? ""
        );
      }
      snackbarAnimation("Record saved successfully!", "success");
      dispatch({ type: "HAS_INITIAL_FETCHED", payload: false });
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
    } catch (err) {
      console.log("error");
      snackbarAnimation("Error occured while saving/ updating record", "error");
    }
    spinnerAnimationStop();
  };

  return (
    <>
      <Heading heading="Amphere entry Form" />
      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Size in Amphere
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
            type="text"
            required
            onChange={setValue}
            id="name"
            name="size"
            placeholder="Size in Amphere"
            value={size}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default AmphereForm;
