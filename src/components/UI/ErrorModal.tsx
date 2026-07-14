import Overlay from "./Overlay";
import ButtonLarge from "./Button/ButtonLarge";
import useAppContext from "../../hooks/useAppContext";
const DEFAULT_ERROR =
  "Something not ideal might be happening. Check your internet connection or try to login again.";

const ErrorModal: React.FC<{
  children: React.ReactNode;
  open: boolean;
  errorHeading?: string;
  errorMessage?: string;
}> = ({ children, open, errorMessage = DEFAULT_ERROR, errorHeading = "" }) => {
  const { dispatch } = useAppContext();

  const userLogout = () => {
    dispatch({
      type: "SET_ERROR",
      payload: { hasError: false, message: "" },
    });
  };
  return (
    <>
      <Overlay open={open} handleClose={() => {}} widthSize="md">
        <div className="w-96 h-52 font-sans text-center flex justify-center items-center flex-col ">
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4  h-full"
            role="alert"
          >
            <p className="font-bold">{errorHeading}</p>
            <p className="my-6 text-justify">{errorMessage}</p>
            <ButtonLarge
              buttonClick={() => userLogout()}
              title="Logout"
              type="button"
            />
          </div>
        </div>
      </Overlay>
      {children}
    </>
  );
};

export default ErrorModal;
