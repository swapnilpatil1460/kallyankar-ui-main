import { useMemo } from "react";
import useAppContext from "../../../hooks/useAppContext";
import React from "react";
interface AmpProps {
  setValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string | number | null;
}
const GstSelect: React.FC<AmpProps> = ({ setValue, value }) => {
  const { state } = useAppContext();
  const { GST } = state;
  return useMemo(
    () => (
      <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="role"
        >
          GST value
        </label>
        <select
          className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="role"
          name="GST"
          onChange={setValue}
          value={value ?? ""}
        >
          <option value="DEFAULT">Choose gst value.</option>
          {GST?.map((data, index) => {
            return (
              <option key={index} value={data.gst}>
                {data.gst}
              </option>
            );
          })}
        </select>
      </div>
    ),
    [value, setValue, GST]
  );
};

export default GstSelect;
