interface SearchBoxProps {
  setValue: (val: string) => void;
  input: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ setValue, input }) => {
  return (
    <div className="w-full flex justify-between space-x-2 md:space-x-3 min-h-24 bg-[#666699] p-5 text-white rounded-sm">
      <div className="w-1/2 md:w-7/12 flex md:space-x-2 ">
        <div className="hidden md:flex justify-center items-center  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          className={
            " rounded-sm w-full  px-4 bg-white text-sm text-slate-500 h-12 border-2  border-slate-100 placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:shadow-xl focus:border-blue-300"
          }
          type="text"
          placeholder={"Search record"}
          required
          onChange={(e) => setValue(e.target.value)}
          value={input}
        />
      </div>
      <div className="w-1/2 md:w-5/12 flex justify-between items-center"></div>
    </div>
  );
};

export default SearchBox;
