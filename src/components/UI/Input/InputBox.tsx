interface InputBoxProps {
  label: string;
  id: string;
  type: string;
  value?: string | number;
  required?: boolean;
  width?: string;
  margin?: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  type,
  id,
  setValue,
  value,
  required,
  width = "w-full",
  margin = "m-4",
}) => {
  return (
    <div className={`${width} ${margin}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
        value={value}
        required
        onChange={setValue}
      />
    </div>
  );
};
export default InputBox;
