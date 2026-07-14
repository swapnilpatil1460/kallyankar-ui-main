import { useInitialFetch } from "../../hooks";
import useAppContext from "../../hooks/useAppContext";
import AmphereForm from "../Forms/AmphereForm";
import BatteryForm from "../Forms/BatteryForm";
import CustomerForm from "../Forms/CustomerForm";
import GSTForm from "../Forms/GSTForm";
import ProductForm from "../Forms/ProductForm";
import StockForms from "../Forms/StockForm";
import UserForm from "../Forms/UserForm";
import Overlay from "./Overlay";

const FormModal: React.FC<{ showForm: boolean }> = ({ showForm }) => {
  const { dispatch, state } = useAppContext();
  const { type } = state.formProps;
  const handleOverlayClose = () => {
    dispatch({ type: "HIDE_SHOW_FORM", payload: false });
  };

  useInitialFetch();
  return (
    <Overlay handleClose={handleOverlayClose} open={showForm} showButton={true}>
      {type === "CUSTOMER" && <CustomerForm />}
      {type === "AMPHERE" && <AmphereForm />}
      {type === "BATTERY" && <BatteryForm />}
      {type === "GST" && <GSTForm />}
      {type === "PRODUCT" && <ProductForm />}
      {type === "STOCK" && <StockForms />}
      {type === "USER" && <UserForm />}
    </Overlay>
  );
};

export default FormModal;
