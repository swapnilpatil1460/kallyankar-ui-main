type ButtonSaveProps = {
  title?: string;
  type?: "button" | "submit";
};
import React from "react";

const ButtonSave: React.FC<ButtonSaveProps> = ({
  title = "Submit",
  type = "submit",
}) => {
  return (
    <div className="w-full pt-4">
      <button
        type={type}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold uppercase tracking-widest text-white bg-theme-c1 hover:bg-theme-c1-b focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-c1 focus:ring-offset-theme-bg transition-colors"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonSave;
