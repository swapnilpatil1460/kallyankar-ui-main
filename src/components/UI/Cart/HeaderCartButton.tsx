import { useEffect, useMemo, useState } from "react";
import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

interface CartProps {
  onClick: () => void;
  itemCount: number;
}

const HeaderCartButton: React.FC<CartProps> = ({ onClick, itemCount }) => {
  const [btnIsHighLighted, setButtonIsHighLighted] = useState(false);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (itemCount > 0) {
      setButtonIsHighLighted(true);
      const timer = setTimeout(() => {
        setButtonIsHighLighted(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [itemCount]);

  return useMemo(
    () => (
      <div className={classes.actions}>
        <button className={btnClasses} onClick={onClick}>
          <span className={classes.icon}>
            <CartIcon />
          </span>
          <span className={classes.badge}>{itemCount}</span>
        </button>
      </div>
    ),
    [btnClasses, itemCount, onClick]
  );
};

export default HeaderCartButton;
