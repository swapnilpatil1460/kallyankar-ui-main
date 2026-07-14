import React from "react";

const activityData = [
  { date: "2024-08-01", event: "Product A Launched" },
  { date: "2024-08-10", event: "Promotion B Started" },
  // Add more activities
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Activity Timeline</h2>
      <ul className="space-y-4">
        {activityData.map((activity, index) => (
          <li key={index} className="flex items-start">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2.5"></span>
            <div className="ml-4">
              <time>{activity.date}</time>
              <p className="text-sm text-gray-700">{activity.event}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTimeline;
