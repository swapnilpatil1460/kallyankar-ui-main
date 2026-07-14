import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  widthSize?: "md" | "lg" | "sm";
  showButton?: boolean;
}
const Overlay: React.FC<Props> = ({
  children,
  open,
  handleClose,
  widthSize = "md",
  showButton = false,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={widthSize}
    >
      {children}
      {showButton && (
        <DialogActions>
          <Button onClick={() => handleClose()}>cLOSE</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Overlay;
