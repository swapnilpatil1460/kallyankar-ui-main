import { GSTValues } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewGST, updateGSTById } from "../../backend/gst";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import { useAnimation } from "../../hooks";

const GSTForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { formProps, GST } = state;
  const { data: _gst, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_gst as GSTValues);

  const { gst, _id } = data as GSTValues;
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gst < 0) {
      snackbarAnimation("Please enter valid GST value", "error");
      return;
    }
    const itemIndex = GST.findIndex((element) => element.gst === gst);
    if (itemIndex !== -1) {
      snackbarAnimation(`GST value ${gst} already exists`, "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (mode === "ADD_RECORD") {
        await postNewGST(data as GSTValues);
      } else {
        await updateGSTById(data as GSTValues, _id ?? "");
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
      <Heading heading={title ?? "Add GST VALUE"} />
      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            GST
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="name"
            placeholder="GST"
            name="gst"
            value={gst}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default GSTForm;
