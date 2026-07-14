interface ButtonSmallProps {
  addNewItem: () => void;
  title?: string;
}
const ButtonSmall: React.FC<ButtonSmallProps> = ({
  addNewItem,
  title = "NEW",
}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <button
        onClick={addNewItem}
        className="rounded bg-[#3b71ca] px-6 py-2.5 text-xs min-w-[30%] md:min-w-[20%] font-medium uppercase leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#386bc0] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      >
        <span></span>
        <span>{title}</span>
      </button>
    </div>
  );
};

export default ButtonSmall;
