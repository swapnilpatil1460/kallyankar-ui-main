import React from "react";

interface Props {
  pageTitle: string;
  onAddRecord: () => void;
  isVisible?: boolean;
  buttonTitle?: string;
  subTitle?: string;
}

const TitleScreen: React.FC<Props> = ({
  pageTitle,
  onAddRecord,
  isVisible = true,
  buttonTitle = "Add Record",
  subTitle = "Kalyankar Batteries",
}) => {
  return (
    <div className="bg-white border-b border-theme-c3 p-6 sm:p-8 flex items-center justify-between shadow-sm relative">
      {/* Subtle Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-theme-c1 rounded-r-md"></div>
      
      <div className="space-y-1 pl-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-sm font-medium text-slate-500">
          {subTitle}
        </p>
      </div>
      
      {isVisible && (
        <button
          onClick={onAddRecord}
          className="bg-theme-c1 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-sm"
        >
          {buttonTitle}
        </button>
      )}
    </div>
  );
};

export default TitleScreen;
