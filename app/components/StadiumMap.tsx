import React, { useState } from "react";
import { FiMapPin, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";

interface StadiumMapProps {
  className?: string;
  highlightedGate?: string; // Gate yang akan di-highlight
}

interface TooltipData {
  show: boolean;
  x: number;
  y: number;
  content: string;
}

const StadiumMap: React.FC<StadiumMapProps> = ({
  className = "",
  highlightedGate,
}) => {
  const { data } = useSimulation();
  const [tooltip, setTooltip] = useState<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

  const handleMouseEnter = (
    event: React.MouseEvent<SVGElement>,
    content: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget
      .closest(".relative")
      ?.getBoundingClientRect();
    if (containerRect) {
      setTooltip({
        show: true,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 10,
        content,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: "" });
  };

  // Posisi gate dan tempat sampah (dalam persen untuk SVG)
  const gates = [
    { id: "Gerbang 1", x: 20, y: 85, status: data.gateStatuses["Gerbang 1"] },
    { id: "Gerbang 2", x: 80, y: 85, status: data.gateStatuses["Gerbang 2"] },
    { id: "Gerbang 3", x: 20, y: 15, status: data.gateStatuses["Gerbang 3"] },
    { id: "Gerbang 4", x: 80, y: 15, status: data.gateStatuses["Gerbang 4"] },
  ];

  const trashBins = [
    { id: "Tribun 7-A", x: 28, y: 32, level: 45 },
    { id: "Tribun 7-B", x: 72, y: 32, level: data.trashLevel },
    { id: "Tribun 8-A", x: 28, y: 68, level: 32 },
    { id: "Tribun 8-B", x: 72, y: 68, level: 58 },
  ];

  const getGateColor = (status: string) => {
    switch (status) {
      case "alert":
        return "#ef4444"; // red-500
      case "warning":
        return "#f59e0b"; // yellow-500
      default:
        return "#10b981"; // green-500
    }
  };

  const getTrashColor = (level: number) => {
    if (level >= 90) return "#ef4444"; // red-500
    if (level >= 75) return "#f59e0b"; // yellow-500
    if (level >= 50) return "#3b82f6"; // blue-500
    return "#10b981"; // green-500
  };

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Peta Stadion</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Peringatan</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Alert</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900 rounded-lg p-4 min-h-[400px]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ minHeight: "400px" }}
        >
          {/* Background pattern */}
          <defs>
            <pattern
              id="stadiumPattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="0.5" fill="#374151" opacity="0.3" />
            </pattern>
          </defs>

          {/* Stadium background */}
          <ellipse
            cx="50"
            cy="50"
            rx="48"
            ry="38"
            fill="url(#stadiumPattern)"
            className="opacity-20"
          />

          {/* Stadium outline */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="36"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.5"
            className="opacity-80"
          />

          {/* Inner field */}
          <ellipse
            cx="50"
            cy="50"
            rx="36"
            ry="26"
            fill="#047857"
            className="opacity-60"
          />

          {/* Field lines */}
          <line
            x1="14"
            y1="50"
            x2="86"
            y2="50"
            stroke="#10b981"
            strokeWidth="0.8"
            className="opacity-80"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.8"
            className="opacity-80"
          />

          {/* Center dot */}
          <circle
            cx="50"
            cy="50"
            r="0.5"
            fill="#10b981"
            className="opacity-80"
          />

          {/* Stadium sections */}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            className="fill-gray-300"
            fontSize="4"
            fontWeight="600"
          >
            Lapangan
          </text>

          {/* Gates */}
          {gates.map((gate) => {
            const isHighlighted = highlightedGate === gate.id;
            return (
              <g key={gate.id}>
                {/* Highlight ring untuk gate yang dipilih */}
                {isHighlighted && (
                  <>
                    <circle
                      cx={gate.x}
                      cy={gate.y}
                      r="12"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1"
                      className="animate-pulse"
                      opacity="0.8"
                    />
                    <circle
                      cx={gate.x}
                      cy={gate.y}
                      r="15"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.5"
                      className="animate-ping"
                      opacity="0.6"
                    />
                  </>
                )}

                {/* Gate pin background */}
                <path
                  d={`M ${gate.x} ${gate.y - 4} 
                   C ${gate.x - 2.5} ${gate.y - 4} ${gate.x - 4} ${
                    gate.y - 2.5
                  } ${gate.x - 4} ${gate.y}
                   C ${gate.x - 4} ${gate.y + 1.5} ${gate.x - 2.5} ${
                    gate.y + 3
                  } ${gate.x} ${gate.y + 5}
                   C ${gate.x + 2.5} ${gate.y + 3} ${gate.x + 4} ${
                    gate.y + 1.5
                  } ${gate.x + 4} ${gate.y}
                   C ${gate.x + 4} ${gate.y - 2.5} ${gate.x + 2.5} ${
                    gate.y - 4
                  } ${gate.x} ${gate.y - 4} Z`}
                  fill={getGateColor(gate.status)}
                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    isHighlighted ? "filter brightness-125" : ""
                  }`}
                  onMouseEnter={(e) =>
                    handleMouseEnter(
                      e,
                      `${gate.id} - Status: ${
                        gate.status === "normal"
                          ? "Aman"
                          : gate.status === "warning"
                          ? "Peringatan"
                          : "Alert"
                      }`
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
                {/* Gate pin circle */}
                <circle
                  cx={gate.x}
                  cy={gate.y - 1}
                  r="1.5"
                  fill="white"
                  className="pointer-events-none"
                />
                <text
                  x={gate.x}
                  y={gate.y + 8}
                  textAnchor="middle"
                  className={`pointer-events-none font-semibold ${
                    isHighlighted ? "fill-blue-300" : "fill-white"
                  }`}
                  fontSize="3.5"
                >
                  {gate.id}
                </text>
                {gate.status === "alert" && (
                  <>
                    <circle
                      cx={gate.x}
                      cy={gate.y}
                      r="6"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.5"
                      className="animate-pulse"
                    />
                    <circle
                      cx={gate.x}
                      cy={gate.y}
                      r="8"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.3"
                      className="animate-ping"
                      opacity="0.7"
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Trash bins */}
          {trashBins.map((bin) => (
            <g key={bin.id}>
              {/* Trash bin container */}
              <rect
                x={bin.x - 2}
                y={bin.y - 2}
                width="4"
                height="4"
                fill={getTrashColor(bin.level)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                rx="0.5"
                onMouseEnter={(e) =>
                  handleMouseEnter(e, `${bin.id} - Terisi: ${bin.level}%`)
                }
                onMouseLeave={handleMouseLeave}
              />
              {/* Trash bin icon detail */}
              <rect
                x={bin.x - 1.5}
                y={bin.y - 1.5}
                width="3"
                height="3"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                className="pointer-events-none"
                rx="0.3"
              />
              <text
                x={bin.x}
                y={bin.y + 6}
                textAnchor="middle"
                className="fill-white pointer-events-none font-semibold"
                fontSize="3"
              >
                {bin.id}
              </text>
              <text
                x={bin.x}
                y={bin.y + 9}
                textAnchor="middle"
                className="fill-gray-300 pointer-events-none"
                fontSize="2.5"
              >
                {bin.level}%
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip.show && (
          <div
            className="absolute z-10 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            {tooltip.content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-95 rounded-lg p-3 space-y-2 border border-gray-700">
          <div className="text-xs font-semibold text-gray-200 mb-2">
            Legenda
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Gerbang</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <div className="w-4 h-4 bg-blue-500 rounded-sm border border-white border-opacity-50"></div>
            <span>Tempat Sampah</span>
          </div>
          {data.activeAlerts > 0 && (
            <div className="flex items-center space-x-2 text-xs text-red-400">
              <FiAlertTriangle className="animate-pulse w-4 h-4" />
              <span>{data.activeAlerts} Alert Aktif</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumMap;
