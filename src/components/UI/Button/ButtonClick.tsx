import React from "react";
import { Button } from "flowbite-react";
type Props = {
  title?: string;
  onClick: () => void;
};

const ButtonClick: React.FC<Props> = ({ title = "Submit", onClick }) => {
  return (
    <div className="w-full flex justify-end">
      <Button onClick={onClick}>{title}</Button>
    </div>
  );
};

export default ButtonClick;
