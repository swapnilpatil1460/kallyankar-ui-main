import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  color?: string;
  isLoading?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendLabel,
  color = "#6366f1",
  isLoading = false,
}) => {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "#22c55e"
      : trend === "down"
      ? "#ef4444"
      : "#94a3b8";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)",
        borderLeft: `4px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minHeight: "120px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {title}
        </span>
        {icon && (
          <div style={{ background: `${color}18`, borderRadius: "10px", padding: "8px", color }}>
            {icon}
          </div>
        )}
      </div>

      {isLoading ? (
        <div style={{ height: "32px", background: "#f1f5f9", borderRadius: "8px", animation: "pulse 1.5s infinite" }} />
      ) : (
        <span style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
          {value}
        </span>
      )}

      {(trend || subtitle) && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
          {trend && (
            <>
              <TrendIcon size={13} color={trendColor} />
              <span style={{ fontSize: "12px", color: trendColor, fontWeight: 600 }}>
                {trendLabel}
              </span>
            </>
          )}
          {subtitle && (
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
