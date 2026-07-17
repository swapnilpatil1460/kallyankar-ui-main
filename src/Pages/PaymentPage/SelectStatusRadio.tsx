const SelectStatuRadio: React.FC<{
  setStatus: (val: string) => void;
  status: string;
}> = ({ setStatus, status }) => {
  const tabs = ["Unpaid", "Paid"];
  
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-full shadow-inner w-full max-w-sm border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatus(tab)}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all duration-300 ease-in-out ${
              status === tab
                ? "bg-theme-c1 text-white shadow-md transform scale-100"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200 transform scale-95"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectStatuRadio;
