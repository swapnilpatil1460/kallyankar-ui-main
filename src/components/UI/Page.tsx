import React from "react";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-center">{children}</div>
  );
};

export default PageWrapper;
