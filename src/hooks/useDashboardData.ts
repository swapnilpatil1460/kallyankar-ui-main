import { useState, useEffect, useCallback } from "react";
import { getBillingList } from "../backend/billing";
import { getCustomerList } from "../backend/customer";
import { getProductList } from "../backend/product";
import { getStockList } from "../backend/stock";
import { Billing, Customer, Product, STOCK } from "../store/type";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return d.getFullYear() * 100 + d.getMonth(); // e.g. 202506
}

function getMonthLabel(dateStr: string) {
  const d = new Date(dateStr);
  return MONTHS[d.getMonth()];
}

export interface MonthlyData {
  month: string;
  value: number;
  monthKey: number;
}

export interface PieData {
  name: string;
  value: number;
}

export interface TopItem {
  name: string;
  count: number;
}

export interface RevenueExpenseData {
  month: string;
  revenue: number;
  unpaid: number;
  monthKey: number;
}

export interface ActivityItem {
  date: string;
  event: string;
  type: "billing" | "customer";
}

export interface StockData {
  name: string;
  available: number;
  productCode: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUnpaid: number;
  totalCustomers: number;
  totalProductsSold: number;
  totalStockAvailable: number;
  paidBillsCount: number;
  unpaidBillsCount: number;
}

export interface DashboardData {
  stats: DashboardStats;
  monthlyCustomers: MonthlyData[];
  monthlyProductsSold: MonthlyData[];
  monthlyRevenue: MonthlyData[];
  batteryTypePie: PieData[];
  topBatteries: TopItem[];
  revenueVsUnpaid: RevenueExpenseData[];
  recentActivity: ActivityItem[];
  stockByBattery: StockData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const useDashboardData = (): DashboardData => {
  const [billingList, setBillingList] = useState<Billing[]>([]);
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [stockList, setStockList] = useState<STOCK[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetch = useCallback(() => setFetchTrigger((n) => n + 1), []);

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [billing, customers, products, stocks] = await Promise.all([
          getBillingList(),
          getCustomerList({ page: 1, limit: 9999, sortBy: "createdAt", sortOrder: "asc", search: "" }),
          getProductList(),
          getStockList(),
        ]);
        if (!mounted) return;
        setBillingList(Array.isArray(billing) ? billing : []);
        setCustomerData(
          customers && Array.isArray((customers as any).customers)
            ? (customers as any).customers
            : Array.isArray(customers)
            ? customers as unknown as Customer[]
            : []
        );
        setProductList(Array.isArray(products) ? products : []);
        setStockList(Array.isArray(stocks) ? stocks : []);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : "Failed to load dashboard data");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchAll();
    return () => { mounted = false; };
  }, [fetchTrigger]);

  // ─── Derived Metrics ────────────────────────────────────────────────────────

  // Stats
  const stats: DashboardStats = {
    totalRevenue: billingList.reduce((s, b) => s + (b.total_amount ?? 0), 0),
    totalUnpaid: billingList.reduce((s, b) => s + (b.unpaid_amount ?? 0), 0),
    totalCustomers: customerData.length,
    totalProductsSold: productList.length,
    totalStockAvailable: stockList.reduce((s, st) => s + (Number(st.available) || 0), 0),
    paidBillsCount: billingList.filter((b) => b.bill_status === "Paid").length,
    unpaidBillsCount: billingList.filter((b) => b.bill_status !== "Paid").length,
  };

  // Monthly customers (by createdAt month)
  const customerMonthMap: Record<number, { label: string; count: number }> = {};
  customerData.forEach((c) => {
    if (!c.createdAt) return;
    const key = getMonthKey(c.createdAt);
    const label = getMonthLabel(c.createdAt);
    if (!customerMonthMap[key]) customerMonthMap[key] = { label, count: 0 };
    customerMonthMap[key].count++;
  });
  const monthlyCustomers: MonthlyData[] = Object.entries(customerMonthMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-12)
    .map(([key, v]) => ({ month: v.label, value: v.count, monthKey: Number(key) }));

  // Monthly products sold (by createdAt month)
  const productMonthMap: Record<number, { label: string; count: number }> = {};
  productList.forEach((p) => {
    if (!p.createdAt) return;
    const key = getMonthKey(p.createdAt);
    const label = getMonthLabel(p.createdAt);
    if (!productMonthMap[key]) productMonthMap[key] = { label, count: 0 };
    productMonthMap[key].count++;
  });
  const monthlyProductsSold: MonthlyData[] = Object.entries(productMonthMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-12)
    .map(([key, v]) => ({ month: v.label, value: v.count, monthKey: Number(key) }));

  // Monthly revenue (from billing total_amount)
  const revenueMonthMap: Record<number, { label: string; revenue: number }> = {};
  billingList.forEach((b) => {
    if (!b.createdAt) return;
    const key = getMonthKey(b.createdAt);
    const label = getMonthLabel(b.createdAt);
    if (!revenueMonthMap[key]) revenueMonthMap[key] = { label, revenue: 0 };
    revenueMonthMap[key].revenue += b.total_amount ?? 0;
  });
  const monthlyRevenue: MonthlyData[] = Object.entries(revenueMonthMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-12)
    .map(([key, v]) => ({ month: v.label, value: v.revenue, monthKey: Number(key) }));

  // Battery type pie (distribution of product types sold)
  const typeMap: Record<string, number> = {};
  productList.forEach((p) => {
    const t = p.type || "Unknown";
    typeMap[t] = (typeMap[t] || 0) + 1;
  });
  const batteryTypePie: PieData[] = Object.entries(typeMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  // Top batteries by name (count how many sold)
  const batteryNameMap: Record<string, number> = {};
  productList.forEach((p) => {
    const n = p.name || "Unknown";
    batteryNameMap[n] = (batteryNameMap[n] || 0) + 1;
  });
  const topBatteries: TopItem[] = Object.entries(batteryNameMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Revenue vs Unpaid per month
  const revUnpaidMap: Record<number, { label: string; revenue: number; unpaid: number }> = {};
  billingList.forEach((b) => {
    if (!b.createdAt) return;
    const key = getMonthKey(b.createdAt);
    const label = getMonthLabel(b.createdAt);
    if (!revUnpaidMap[key]) revUnpaidMap[key] = { label, revenue: 0, unpaid: 0 };
    revUnpaidMap[key].revenue += b.total_amount ?? 0;
    revUnpaidMap[key].unpaid += b.unpaid_amount ?? 0;
  });
  const revenueVsUnpaid: RevenueExpenseData[] = Object.entries(revUnpaidMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-12)
    .map(([key, v]) => ({ month: v.label, revenue: v.revenue, unpaid: v.unpaid, monthKey: Number(key) }));

  // Recent activity from last billing events
  const recentActivity: ActivityItem[] = billingList
    .filter((b) => b.createdAt)
    .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    .slice(0, 6)
    .map((b) => ({
      date: new Date(b.createdAt!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      event: `Bill of ₹${(b.total_amount ?? 0).toLocaleString("en-IN")} — ${b.bill_status ?? "Paid"}`,
      type: "billing" as const,
    }));

  // Stock per battery name
  const stockByBattery: StockData[] = stockList.map((s) => ({
    name: s.battery_name,
    available: Number(s.available) || 0,
    productCode: s.product_code,
  }));

  return {
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
  };
};

export default useDashboardData;
