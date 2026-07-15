import { BatteryNameValues } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewBattery, updateBatteryById } from "../../backend/battery";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import { useAnimation } from "../../hooks";

const BatteryForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { formProps, batteryNames } = state;
  const { data: _battery, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(
    _battery as BatteryNameValues
  );

  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { name, _id } = data as BatteryNameValues;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 2) {
      snackbarAnimation("Please enter valid battery name", "error");
      return;
    }
    const itemIndex = batteryNames.findIndex(
      (element) => element.name.toLowerCase() === name.toLowerCase()
    );
    if (itemIndex !== -1) {
      snackbarAnimation("Battery name already exists", "error");
      return;
    }

    try {
      spinnerAnimationStart();
      if (mode === "ADD_RECORD") {
        const response = await postNewBattery(data as BatteryNameValues);
      } else {
        await updateBatteryById(data as BatteryNameValues, _id ?? "");
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
      <Heading heading={title ?? "Battery record Form"} />

      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="nameId"
          >
            Battery Name
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
            type="text"
            required
            onChange={setValue}
            id="nameId"
            placeholder="Battery Name"
            value={name}
            name="name"
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default BatteryForm;
