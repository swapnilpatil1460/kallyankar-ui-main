import * as React from "react";
import { getStockList } from "../../backend/stock";
import StockTable from "../../components/UI/Table/StockTable";
import TitleScreen from "../../components/UI/TitleScreen";
import { useApiCall, useAppContext } from "../../hooks";
import { STOCK } from "../../store/type";

const Stock = () => {
  const { state, dispatch } = useAppContext();

  const { refreshEffect } = state;

  const params = React.useMemo(() => {
    return { refreshEffect };
  }, [refreshEffect]);

  const { data } = useApiCall(getStockList, params);

  const addRecordFormHandler = () => {
    const stock: STOCK = {
      battery_name: "",
      product_code: "",
      amphere_size: "",
      available: "0",
    };
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: stock,
        mode: "ADD_RECORD",
        type: "STOCK",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  return (
    <div className="w-full">
      <TitleScreen
        onAddRecord={addRecordFormHandler}
        pageTitle="Stock analysis and screening tool for Kalyankar Batteries. "
      />
      {data && <StockTable data={data} />}
    </div>
  );
};

export default Stock;
