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
      fullWidth={true}
      PaperProps={{
        style: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      {children}
      {showButton && (
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ color: '#cc0000', fontWeight: 'bold' }}>CLOSE</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Overlay;
