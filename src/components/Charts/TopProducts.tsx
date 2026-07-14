import React from "react";
import { TopItem } from "../../hooks/useDashboardData";

interface TopProductsProps {
  data: TopItem[];
  isLoading?: boolean;
}

const MEDAL_COLORS = ["#f59e0b", "#9ca3af", "#b45309"];
const BAR_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const TopProducts: React.FC<TopProductsProps> = ({ data, isLoading }) => {
  const maxCount = data.length > 0 ? Math.max(...data.map((d) => d.count)) : 1;

  return (
    <div style={{
      background: "#ffffff", borderRadius: "16px", padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)"
    }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
          Top Batteries Sold
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
          Best-selling battery models by units sold
        </p>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ height: "40px", background: "#f8fafc", borderRadius: "8px", animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" }}>
          No product sales data available
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {data.map((item, index) => (
            <div key={index}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: index < 3 ? MEDAL_COLORS[index] + "20" : "#f1f5f9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 800,
                    color: index < 3 ? MEDAL_COLORS[index] : "#64748b",
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                  </span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: BAR_COLORS[index % BAR_COLORS.length] }}>
                  {item.count} sold
                </span>
              </div>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(item.count / maxCount) * 100}%`,
                  background: BAR_COLORS[index % BAR_COLORS.length],
                  borderRadius: "99px",
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
