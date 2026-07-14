import React from "react";
import { ActivityItem } from "../../hooks/useDashboardData";
import { Receipt, UserPlus } from "lucide-react";

interface ActivityTimelineProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, isLoading }) => {
  return (
    <div style={{
      background: "#ffffff", borderRadius: "16px", padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)"
    }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
          Recent Activity
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
          Latest billing and customer events
        </p>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f1f5f9", flexShrink: 0, animation: "pulse 1.5s infinite" }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ height: "12px", background: "#f1f5f9", borderRadius: "6px", animation: "pulse 1.5s infinite" }} />
                <div style={{ height: "10px", background: "#f8fafc", borderRadius: "6px", width: "60%", animation: "pulse 1.5s infinite" }} />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" }}>
          No recent activity
        </div>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0" }}>
          {activities.map((activity, index) => {
            const isBilling = activity.type === "billing";
            const iconBg = isBilling ? "#ede9fe" : "#d1fae5";
            const iconColor = isBilling ? "#7c3aed" : "#059669";
            const Icon = isBilling ? Receipt : UserPlus;
            const isLast = index === activities.length - 1;

            return (
              <li key={index} style={{ display: "flex", gap: "14px", alignItems: "flex-start", position: "relative" }}>
                {/* Vertical line connector */}
                {!isLast && (
                  <div style={{
                    position: "absolute", left: "15px", top: "34px",
                    width: "2px", height: "calc(100% - 12px)",
                    background: "#f1f5f9", zIndex: 0,
                  }} />
                )}
                {/* Icon */}
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: iconBg, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0, zIndex: 1,
                }}>
                  <Icon size={14} color={iconColor} />
                </div>
                {/* Content */}
                <div style={{ paddingBottom: "18px", flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                    {activity.event}
                  </p>
                  <time style={{ fontSize: "11px", color: "#94a3b8" }}>{activity.date}</time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ActivityTimeline;
