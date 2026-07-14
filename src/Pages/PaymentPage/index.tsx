import useAppContext from "../../hooks/useAppContext";
import { useMemo, useState } from "react";
import useApiCall from "../../hooks/useApiCall";
import { getBillingListByStatus } from "../../backend/billing";
import BillingStatusTable from "../../components/UI/Table/BillingStatusTable";
import SelectStatuRadio from "./SelectStatusRadio";
import Nothing from "../../components/UI/Nothing";
import TitleScreen from "../../components/UI/TitleScreen";
const BillStatusPage = () => {
  const { state } = useAppContext();
  const [status, setStatus] = useState("Unpaid");
  const { refreshEffect } = state;
  const params = useMemo(() => {
    return { refreshEffect, status };
  }, [refreshEffect, status]);
  const { data } = useApiCall(getBillingListByStatus, params);

  return (
    <>
      <TitleScreen
        onAddRecord={() => {}}
        pageTitle="Customer payment status "
        isVisible={false}
      />
      <div className="w-full p-10">
        <SelectStatuRadio setStatus={setStatus} status={status} />
        {data && data.length < 1 && (
          <Nothing
            heading="No Record"
            subHeading="Please add records to see..."
          />
        )}
        {data && data.length > 0 && (
          <BillingStatusTable data={data} status={status} />
        )}
      </div>
    </>
  );
};

export default BillStatusPage;
