import React, { useState } from "react";
import {
  FiAlertTriangle,
  FiClock,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";
import type { SecurityAlert } from "../context/SimulationContext";

interface AlertsPanelProps {
  onAlertClick: (alert: SecurityAlert) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ onAlertClick }) => {
  const { data } = useSimulation();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeAlerts = data.securityAlerts.filter(
    (alert) => alert.status !== "resolved"
  );
  const resolvedAlerts = data.securityAlerts.filter(
    (alert) => alert.status === "resolved"
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAlertStatusColor = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getAlertStatusText = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "new":
        return "BARU";
      case "in_progress":
        return "DALAM PENANGANAN";
      case "resolved":
        return "DISELESAIKAN";
      default:
        return "UNKNOWN";
    }
  };

  const AlertItem: React.FC<{ alert: SecurityAlert; isNew?: boolean }> = ({
    alert,
    isNew = false,
  }) => (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-700 ${
        isNew
          ? "bg-red-900/30 border-red-500/50 animate-pulse"
          : "bg-gray-800 border-gray-600"
      }`}
      onClick={() => onAlertClick(alert)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FiAlertTriangle
            className={`text-lg ${isNew ? "text-red-400" : "text-yellow-400"}`}
          />
          <span
            className={`text-xs px-2 py-1 rounded-full border ${getAlertStatusColor(
              alert.status
            )}`}
          >
            {getAlertStatusText(alert.status)}
          </span>
        </div>
        <span className="text-xs text-gray-400 flex items-center">
          <FiClock className="mr-1" />
          {formatTime(alert.timestamp)}
        </span>
      </div>

      <h4 className="text-white font-medium mb-1">{alert.threatType}</h4>

      <div className="flex items-center text-sm text-gray-400 mb-2">
        <FiMapPin className="mr-1" />
        {alert.location}
      </div>

      {alert.userName && (
        <div className="text-xs text-gray-500">
          Melibatkan: {alert.userName}
        </div>
      )}

      {alert.assignedTo && (
        <div className="text-xs text-blue-400 mt-1">
          Ditangani: {alert.assignedTo}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl h-full flex flex-col">
      {/* Header dengan Tab */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Panel Peringatan</h2>

        <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
          <button
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "active"
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Peringatan Aktif ({activeAlerts.length})
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "bg-green-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Riwayat Resolusi ({resolvedAlerts.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "active" ? (
          <div className="space-y-3">
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8">
                <FiCheckCircle className="text-4xl text-green-500 mx-auto mb-2" />
                <p className="text-gray-400">Tidak ada peringatan aktif</p>
                <p className="text-sm text-gray-500">
                  Sistem keamanan beroperasi normal
                </p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  isNew={alert.status === "new"}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {resolvedAlerts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Belum ada riwayat resolusi</p>
                <p className="text-sm text-gray-500">
                  Riwayat kasus yang diselesaikan akan muncul di sini
                </p>
              </div>
            ) : (
              resolvedAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer dengan ringkasan */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Alert Baru:</span>
            <span className="ml-2 text-red-400 font-medium">
              {activeAlerts.filter((a) => a.status === "new").length}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Dalam Penanganan:</span>
            <span className="ml-2 text-yellow-400 font-medium">
              {activeAlerts.filter((a) => a.status === "in_progress").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
