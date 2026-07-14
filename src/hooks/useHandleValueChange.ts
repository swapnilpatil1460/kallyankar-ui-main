import { useState } from "react";
import { UserFormData } from "../store/type";

const useHandlevalueChange = (initial: UserFormData) => {
  const [data, setData] = useState(initial);

  const setValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const selectedInput = e.target.name;
    setData((prev) => ({ ...prev, [selectedInput]: e.target.value }));
  };

  return { data, setValue };
};

export default useHandlevalueChange;
