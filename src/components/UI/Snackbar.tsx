import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AppContext from "../../store/AppContext";
import { Severity } from "../../store/type";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar: React.FC<{
  open: boolean;
  message: string;
  children: React.ReactNode;
  severty?: Severity;
}> = ({ open, message, children, severty = "success" }) => {
  const { dispatch } = React.useContext(AppContext);
  React.useEffect(() => {});
  const handleClose = (event?: React.SyntheticEvent | Event) => {
    console.log("closing snackbar");
    dispatch({
      type: "TOGGLE_SNACKBAR",
      payload: { isOpen: false, message: "", severity: "success" },
    });
  };

  return (
    <>
      {open && (
        <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severty}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </>
  );
};
export default CustomizedSnackbar;
