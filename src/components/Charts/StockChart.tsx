import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import { StockData } from "../../hooks/useDashboardData";

interface StockChartProps {
  data: StockData[];
  isLoading?: boolean;
}

const LOW_STOCK_THRESHOLD = 5;

const getBarColor = (available: number) => {
  if (available <= 0) return "#ef4444";
  if (available <= LOW_STOCK_THRESHOLD) return "#f59e0b";
  return "#10b981";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const status = val <= 0 ? "Out of Stock" : val <= LOW_STOCK_THRESHOLD ? "Low Stock" : "In Stock";
    const statusColor = val <= 0 ? "#ef4444" : val <= LOW_STOCK_THRESHOLD ? "#f59e0b" : "#10b981";
    return (
      <div style={{
        background: "#1e293b", color: "#f8fafc", padding: "10px 14px",
        borderRadius: "10px", fontSize: "13px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
      }}>
        <p style={{ margin: 0, fontWeight: 700 }}>{label}</p>
        <p style={{ margin: "4px 0 0", color: statusColor }}>{val} units available</p>
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: statusColor, fontWeight: 600 }}>{status}</p>
      </div>
    );
  }
  return null;
};

const StockChart: React.FC<StockChartProps> = ({ data, isLoading }) => {
  const outOfStock = data.filter((d) => d.available <= 0).length;
  const lowStock = data.filter((d) => d.available > 0 && d.available <= LOW_STOCK_THRESHOLD).length;

  return (
    <div style={{
      background: "#ffffff", borderRadius: "16px", padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
            Remaining Stock by Battery
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
            Available units per battery model in inventory
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {outOfStock > 0 && (
            <span style={{ background: "#fee2e2", color: "#ef4444", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "99px" }}>
              {outOfStock} Out of Stock
            </span>
          )}
          {lowStock > 0 && (
            <span style={{ background: "#fef3c7", color: "#d97706", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "99px" }}>
              {lowStock} Low Stock
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div style={{ height: 280, background: "#f8fafc", borderRadius: "12px", animation: "pulse 1.5s infinite" }} />
      ) : data.length === 0 ? (
        <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" }}>
          No stock data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barSize={32} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#374151" }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
              <ReferenceLine x={LOW_STOCK_THRESHOLD} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Low", fill: "#d97706", fontSize: 10 }} />
              <Bar dataKey="available" radius={[0, 6, 6, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.available)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{ display: "flex", gap: "16px", marginTop: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { color: "#10b981", label: "In Stock" },
              { color: "#f59e0b", label: `Low (≤${LOW_STOCK_THRESHOLD})` },
              { color: "#ef4444", label: "Out of Stock" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }} />
                <span style={{ fontSize: "11px", color: "#64748b" }}>{label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StockChart;
