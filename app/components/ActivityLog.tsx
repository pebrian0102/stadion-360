import React from "react";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";
import type { ActivityLog as ActivityLogType } from "../context/SimulationContext";

interface ActivityLogProps {
  className?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ className = "" }) => {
  const { data } = useSimulation();

  const getIcon = (type: ActivityLogType["type"]) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-500" />;
      case "info":
        return <FiInfo className="text-blue-500" />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-500" />;
      case "error":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiInfo className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: ActivityLogType["type"]) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-500/10";
      case "info":
        return "border-l-blue-500 bg-blue-500/10";
      case "warning":
        return "border-l-yellow-500 bg-yellow-500/10";
      case "error":
        return "border-l-red-500 bg-red-500/10";
      default:
        return "border-l-gray-500 bg-gray-500/10";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} hari lalu`;
    } else if (hours > 0) {
      return `${hours} jam lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit lalu`;
    } else {
      return "Baru saja";
    }
  };

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Log Aktivitas</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-400">
          <FiClock className="w-4 h-4" />
          <span>Real-time</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.activities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FiInfo className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Belum ada aktivitas</p>
          </div>
        ) : (
          data.activities.map((activity) => (
            <div
              key={activity.id}
              className={`border-l-4 pl-4 pr-2 py-3 rounded-r-lg transition-all duration-300 hover:bg-opacity-20 ${getTypeColor(
                activity.type
              )}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    {activity.location && (
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                        📍 {activity.location}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status indicator */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Status sistem:</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
