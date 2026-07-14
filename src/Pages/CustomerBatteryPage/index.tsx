import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCustomerId } from "../../backend/product";
import CartItems from "../../components/UI/Cart/CartItems";
import CustomerBatteryTable from "../../components/UI/Table/CustomerBatteryTable";
import useApiCall from "../../hooks/useApiCall";
import useAppContext from "../../hooks/useAppContext";
import { product } from "../../store/type";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import useInitialFetch from "../../hooks/useInitialFetch";
import Nothing from "../../components/UI/Nothing";
import TitleScreen from "../../components/UI/TitleScreen";
const CustomerBatteryPage = () => {
  const [showCart, setShowCart] = useState(false);
  const { customerId } = useParams();
  const { state } = useAppContext();
  const { refreshEffect, storedCartItems, isLoading } = state;
  const params = useMemo(() => {
    return { refreshEffect, id: customerId ?? "" };
  }, [refreshEffect, customerId]);

  const { data } = useApiCall(getProductByCustomerId, params);
  const { dispatch } = useAppContext();
  useInitialFetch();
  const hideShowCartItems = () => {
    setShowCart((prev) => !prev);
  };
  const handleOpenForm = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: product,
        mode: "ADD_RECORD",
        type: "PRODUCT",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  // delete stored Items if doesn't match with the selecte customer ID
  useEffect(() => {
    if (storedCartItems.length > 0) {
      const { customer = null } = storedCartItems[0];
      console.log({ customer, customerId });
      if (customer !== customerId) {
        dispatch({ type: "ADD_STORED_CART_ITEMS", payload: [] });
      }
    }
  }, [customerId, dispatch, storedCartItems]);
  const showNothing = !isLoading && data && data.length === 0;
  return (
    <>
      {" "}
      <TitleScreen
        onAddRecord={() => handleOpenForm()}
        pageTitle="Customer Battery "
      />
      <div className="w-full p-10">
        <div className="flex justify-end w-full items-center">
          {storedCartItems.length > 0 && (
            <ButtonHeader
              buttonClick={hideShowCartItems}
              title={`Proceed to checkout ${storedCartItems.length} items`}
            />
          )}
        </div>
        {showNothing ? (
          <Nothing
            heading="No item Available"
            subHeading="Please add items in a cart"
          />
        ) : (
          <CustomerBatteryTable data={data ?? []} />
        )}
        {showCart && (
          <CartItems
            open={showCart}
            customerId={customerId ?? ""}
            closeCartHandler={hideShowCartItems}
          />
        )}
      </div>
    </>
  );
};

export default CustomerBatteryPage;
