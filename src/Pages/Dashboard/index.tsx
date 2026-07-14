import { useContext } from "react";
import AppContext from "../../store/AppContext";
import useSessionExpirationWarning from "../../hooks/useSessionExpirationWarning";
import useDashboardData from "../../hooks/useDashboardData";
import SummaryCard from "../../components/Charts/SummaryCard";
import CustomersChart from "../../components/Charts/CustomerChart";
import RevenueChart from "../../components/Charts/RevenueChart";
import ProductsPieChart from "../../components/Charts/ProductPieChart";
import TopProducts from "../../components/Charts/TopProducts";
import RevenueExpenseComparison from "../../components/Charts/RevenueExpenseCompare";
import ActivityTimeline from "../../components/Charts/ActivityTimeline";
import ProductsSoldChart from "../../components/Charts/ProductsSoldChart";
import StockChart from "../../components/Charts/StockChart";
import {
  Users, IndianRupee, ShoppingCart, Package, AlertCircle, RefreshCw,
} from "lucide-react";

const formatRupees = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
  return `₹${value.toLocaleString("en-IN")}`;
};

const Dashboard = () => {
  const { state } = useContext(AppContext);
  useSessionExpirationWarning();

  const {
    stats,
    monthlyCustomers,
    monthlyProductsSold,
    monthlyRevenue,
    batteryTypePie,
    topBatteries,
    revenueVsUnpaid,
    recentActivity,
    stockByBattery,
    isLoading,
    error,
    refetch,
  } = useDashboardData();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "0" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        padding: "28px 32px 24px",
        color: "#fff",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#f8fafc" }}>
              Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
              Kallyankar Battery Shop — Live Business Overview
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={isLoading}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 18px", borderRadius: "10px",
              background: isLoading ? "#475569" : "#6366f1",
              color: "#fff", border: "none", cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "13px", fontWeight: 600, transition: "background 0.2s",
            }}
          >
            <RefreshCw size={15} style={{ animation: isLoading ? "spin 1s linear infinite" : "none" }} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div style={{ padding: "28px 32px" }}>

        {/* Error Banner */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px",
            padding: "14px 18px", marginBottom: "24px",
            display: "flex", alignItems: "center", gap: "10px", color: "#dc2626",
          }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              Failed to load dashboard data: {error}. Please check your API connection.
            </span>
          </div>
        )}

        {/* Summary Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}>
          <SummaryCard
            title="Total Revenue"
            value={isLoading ? "—" : formatRupees(stats.totalRevenue)}
            subtitle="All billing records"
            icon={<IndianRupee size={18} />}
            color="#6366f1"
            isLoading={isLoading}
            trend={stats.totalRevenue > 0 ? "up" : "neutral"}
            trendLabel={`${stats.paidBillsCount} paid bills`}
          />
          <SummaryCard
            title="Unpaid Amount"
            value={isLoading ? "—" : formatRupees(stats.totalUnpaid)}
            subtitle="Outstanding dues"
            icon={<AlertCircle size={18} />}
            color="#ef4444"
            isLoading={isLoading}
            trend={stats.unpaidBillsCount > 0 ? "down" : "neutral"}
            trendLabel={`${stats.unpaidBillsCount} unpaid bills`}
          />
          <SummaryCard
            title="Total Customers"
            value={isLoading ? "—" : stats.totalCustomers.toLocaleString("en-IN")}
            subtitle="Registered customers"
            icon={<Users size={18} />}
            color="#10b981"
            isLoading={isLoading}
            trend={stats.totalCustomers > 0 ? "up" : "neutral"}
            trendLabel="all time"
          />
          <SummaryCard
            title="Batteries Sold"
            value={isLoading ? "—" : stats.totalProductsSold.toLocaleString("en-IN")}
            subtitle="Total products sold"
            icon={<ShoppingCart size={18} />}
            color="#f59e0b"
            isLoading={isLoading}
            trend={stats.totalProductsSold > 0 ? "up" : "neutral"}
            trendLabel="all time"
          />
          <SummaryCard
            title="Stock Available"
            value={isLoading ? "—" : stats.totalStockAvailable.toLocaleString("en-IN")}
            subtitle="Units in inventory"
            icon={<Package size={18} />}
            color="#3b82f6"
            isLoading={isLoading}
            trend={stats.totalStockAvailable > 10 ? "up" : stats.totalStockAvailable > 0 ? "neutral" : "down"}
            trendLabel="units"
          />
        </div>

        {/* Row 1: Monthly Customers + Monthly Revenue */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <CustomersChart data={monthlyCustomers} isLoading={isLoading} />
          <RevenueChart data={monthlyRevenue} isLoading={isLoading} />
        </div>

        {/* Row 2: Monthly Products Sold + Stock Remaining */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <ProductsSoldChart data={monthlyProductsSold} isLoading={isLoading} />
          <StockChart data={stockByBattery} isLoading={isLoading} />
        </div>

        {/* Row 3: Battery Pie + Top Batteries + Revenue vs Unpaid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <ProductsPieChart data={batteryTypePie} isLoading={isLoading} />
          <TopProducts data={topBatteries} isLoading={isLoading} />
          <RevenueExpenseComparison data={revenueVsUnpaid} isLoading={isLoading} />
        </div>

        {/* Row 4: Recent Activity (full width) */}
        <div style={{ marginBottom: "20px" }}>
          <ActivityTimeline activities={recentActivity} isLoading={isLoading} />
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
