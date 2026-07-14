import { NutOffIcon } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full flex-col text-slate-600">
      <div className="flex">
        <h1 className="font-bold font-900 text-2xl">404</h1>
        <NutOffIcon />
      </div>

      <p className=""> Page not found for the given route</p>
    </div>
  );
};

export default PageNotFound;
