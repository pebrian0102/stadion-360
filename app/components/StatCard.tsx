import React from "react";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "red" | "purple";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  className = "",
}) => {
  const colorClasses = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      text: "text-blue-400",
      icon: "text-blue-500",
    },
    green: {
      bg: "from-green-500 to-green-600",
      text: "text-green-400",
      icon: "text-green-500",
    },
    yellow: {
      bg: "from-yellow-500 to-yellow-600",
      text: "text-yellow-400",
      icon: "text-yellow-500",
    },
    red: {
      bg: "from-red-500 to-red-600",
      text: "text-red-400",
      icon: "text-red-500",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      text: "text-purple-400",
      icon: "text-purple-500",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-white">
              {typeof value === "number" ? value.toLocaleString() : value}
            </h3>
            {trend && (
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
        </div>

        <div
          className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center ml-4`}
        >
          <Icon className="text-white text-xl" />
        </div>
      </div>

      {/* Progress bar for certain types */}
      {title.toLowerCase().includes("level") ||
        (title.toLowerCase().includes("sampah") && (
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${colors.bg} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, Number(value) || 0)}%` }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StatCard;
