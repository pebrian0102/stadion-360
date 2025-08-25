import React, { useState, useEffect } from "react";
import {
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";
import type { SecurityAlert } from "../context/SimulationContext";
import StadiumMap from "../components/StadiumMap";
import AlertsPanel from "../components/AlertsPanel";
import AlertDetailModal from "../components/AlertDetailModal";

const SecurityPage: React.FC = () => {
  const { data, selectAlert, highlightGate, addSecurityAlert } =
    useSimulation();

  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Demo function untuk menambah alert baru (untuk testing)
  const simulateNewAlert = () => {
    const threats = [
      "Anomali Kimia",
      "Objek Mencurigakan",
      "Akses Tidak Sah",
      "Gangguan Keamanan",
      "Pelanggaran Protokol",
    ];
    const gates = ["Gerbang 1", "Gerbang 2", "Gerbang 3", "Gerbang 4"];
    const users = [
      {
        name: "Ahmad Wijaya",
        bandId: "BND-001",
        avatar:
          "https://ui-avatars.com/api/?name=Ahmad+Wijaya&background=ef4444&color=fff&size=64",
      },
      {
        name: "Siti Rahayu",
        bandId: "BND-002",
        avatar:
          "https://ui-avatars.com/api/?name=Siti+Rahayu&background=3b82f6&color=fff&size=64",
      },
      {
        name: "Budi Santoso",
        bandId: "BND-003",
        avatar:
          "https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff&size=64",
      },
    ];

    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    addSecurityAlert({
      location: randomGate,
      threatType: randomThreat,
      userName: randomUser.name,
      userBandId: randomUser.bandId,
      userAvatar: randomUser.avatar,
      description: `Sistem telah mendeteksi ${randomThreat.toLowerCase()} melalui sensor keamanan otomatis. Tim keamanan diharapkan segera melakukan verifikasi dan tindakan yang diperlukan.`,
    });
  };

  const handleAlertClick = (alert: SecurityAlert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
    selectAlert(alert);
    highlightGate(alert.location);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
    selectAlert(undefined);
    highlightGate(undefined);
  };

  return (
    <div className="p-6 space-y-6 h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Command Center Keamanan
          </h1>
          <p className="text-gray-400 mt-1">
            Sistem monitoring dan respons keamanan stadion
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div
            className={`px-4 py-2 rounded-lg font-medium ${
              data.securityStatus === "Aman"
                ? "bg-green-500/20 text-green-400"
                : data.securityStatus === "Peringatan"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            <FiShield className="inline mr-2" />
            Status: {data.securityStatus}
          </div>
          {/* Demo button untuk simulasi alert */}
          <button
            onClick={simulateNewAlert}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Simulasi Alert
          </button>
        </div>
      </div>

      {/* Security Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pemindaian</p>
              <p className="text-2xl font-bold text-white">1,247</p>
            </div>
            <FiCheckCircle className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Alert Aktif</p>
              <p className="text-2xl font-bold text-white">
                {data.activeAlerts}
              </p>
            </div>
            <FiAlertTriangle
              className={`text-2xl ${
                data.activeAlerts > 0
                  ? "text-red-500 animate-pulse"
                  : "text-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Petugas Aktif</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <FiUsers className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Waktu Response</p>
              <p className="text-2xl font-bold text-white">2.3s</p>
            </div>
            <FiClock className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Main Layout: 70% Kiri (Peta & Notifikasi) + 30% Kanan (Panel Alert) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 flex-1 min-h-0">
        {/* Area Kiri - Panel Peringatan (70%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Peta Stadion */}
          <div className="h-full">
            <StadiumMap
              className="h-full"
              highlightedGate={data.highlightedGate}
            />
          </div>
        </div>

        {/* Area Kanan - Panel Aksi (30%) */}
        <div className="lg:col-span-3">
          <AlertsPanel onAlertClick={handleAlertClick} />
        </div>
      </div>

      {/* Modal Detail Alert */}
      <AlertDetailModal
        alert={selectedAlert}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default SecurityPage;
