import { Backdrop as MUIBackdrop } from "@mui/material";

const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MUIBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      {children}
    </MUIBackdrop>
  );
};

export default Backdrop;
