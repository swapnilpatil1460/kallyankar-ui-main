import AppContext from "../../store/AppContext";
import { useContext } from "react";
import useSessionExpirationWarning from "../../hooks/useSessionExpirationWarning";
import SummaryCard from "../../components/Charts/SummaryCard";
import CustomersChart from "../../components/Charts/CustomerChart";
import RevenueChart from "../../components/Charts/RevenueChart";
import ProductsPieChart from "../../components/Charts/ProductPieChart";
import TopProducts from "../../components/Charts/TopProducts";
import {
  customerData,
  productData,
  revenueData,
  topProductsData,
} from "../../components/Charts/mock-data";
import RevenueExpenseComparison from "../../components/Charts/RevenueExpenseCompare";
import ActivityTimeline from "../../components/Charts/ActivityTimeline";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  useSessionExpirationWarning();
  // const { submitApi }  = useApiSubmit();
  // submitApi(async () => {
  //   const data = await getCustomerList();
  //   console.log(data);
  // });

  return (
    <div className=" flex items-center justify-center w-full">
      <div className="p-4 bg-gray-100 min-h-screen w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <SummaryCard title="Total Revenue" value="$50,000" />
          <SummaryCard title="New Customers" value="1,200" />
          <SummaryCard title="Products Sold" value="3,000" />
          <SummaryCard title="Profit Margin" value="30%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <CustomersChart data={customerData} />
          <RevenueChart data={revenueData} />
          <ProductsPieChart data={productData} />
          <TopProducts data={topProductsData} />
          <RevenueExpenseComparison />
          <ActivityTimeline />
          {/* Add other components here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
