import React, { useState } from "react";
import {
  FiPlay,
  FiAlertTriangle,
  FiTrash2,
  FiLogOut,
  FiSettings,
  FiRefreshCw,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";

const SimulatorPage: React.FC = () => {
  const {
    data,
    simulateSecurityAlert,
    simulateTrashLevel,
    simulateVisitorExit,
  } = useSimulation();
  const [trashSliderValue, setTrashSliderValue] = useState(data.trashLevel);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSecurityAlert = async () => {
    setIsSimulating(true);
    simulateSecurityAlert();
    setTimeout(() => setIsSimulating(false), 1000);
  };

  const handleTrashLevelChange = (value: number) => {
    setTrashSliderValue(value);
    simulateTrashLevel(value);
  };

  const handleVisitorExit = async () => {
    setIsSimulating(true);
    simulateVisitorExit();
    setTimeout(() => setIsSimulating(false), 1000);
  };

  const SimulationCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    children: React.ReactNode;
  }> = ({ title, description, icon, color, children }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Simulator Kontrol</h1>
          <p className="text-gray-400 mt-1">
            Panel kontrol untuk simulasi berbagai skenario di stadion
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
            <FiRefreshCw className="w-4 h-4" />
            <span>Reset Semua</span>
          </button>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isSimulating
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {isSimulating ? "Simulasi Berjalan..." : "Siap"}
          </div>
        </div>
      </div>

      {/* Current Status Overview */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Status Saat Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {data.totalVisitors.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Penonton</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                data.securityStatus === "Aman"
                  ? "text-green-400"
                  : data.securityStatus === "Peringatan"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {data.securityStatus}
            </div>
            <div className="text-gray-400 text-sm">Status Keamanan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {data.trashLevel}%
            </div>
            <div className="text-gray-400 text-sm">Level Sampah</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                data.activeAlerts > 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {data.activeAlerts}
            </div>
            <div className="text-gray-400 text-sm">Alert Aktif</div>
          </div>
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Alert Simulation */}
        <SimulationCard
          title="Simulasi Peringatan Keamanan"
          description="Memicu alert keamanan di salah satu gerbang secara acak"
          icon={<FiAlertTriangle className="text-white text-xl" />}
          color="from-red-500 to-red-600"
        >
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Efek simulasi:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Status keamanan berubah menjadi "Peringatan"</li>
                <li>• Gerbang acak akan menampilkan status "Alert"</li>
                <li>• Log aktivitas baru akan ditambahkan</li>
                <li>• Alert akan reset otomatis setelah 10 detik</li>
              </ul>
            </div>
            <button
              onClick={handleSecurityAlert}
              disabled={isSimulating}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FiPlay className="w-4 h-4" />
              <span>
                {isSimulating ? "Memproses..." : "Simulasikan Alert Keamanan"}
              </span>
            </button>
          </div>
        </SimulationCard>

        {/* Visitor Exit Simulation */}
        <SimulationCard
          title="Simulasi Pengunjung Keluar"
          description="Simulasi pengunjung keluar stadion dalam jumlah acak"
          icon={<FiLogOut className="text-white text-xl" />}
          color="from-blue-500 to-blue-600"
        >
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Efek simulasi:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Mengurangi total penonton secara acak (100-500)</li>
                <li>• Log aktivitas akan mencatat jumlah keluar</li>
                <li>• Statistik penonton terupdate real-time</li>
              </ul>
            </div>
            <button
              onClick={handleVisitorExit}
              disabled={isSimulating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FiPlay className="w-4 h-4" />
              <span>
                {isSimulating
                  ? "Memproses..."
                  : "Simulasikan Pengunjung Keluar"}
              </span>
            </button>
          </div>
        </SimulationCard>

        {/* Trash Level Control */}
        <SimulationCard
          title="Kontrol Level Sampah Tribun 7-B"
          description="Atur level sampah dari 0% hingga 100% untuk melihat perubahan status"
          icon={<FiTrash2 className="text-white text-xl" />}
          color="from-purple-500 to-purple-600"
        >
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Level Sampah Saat Ini</span>
                <span
                  className={`text-xl font-bold ${
                    trashSliderValue >= 90
                      ? "text-red-400"
                      : trashSliderValue >= 75
                      ? "text-yellow-400"
                      : trashSliderValue >= 50
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  {trashSliderValue}%
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={trashSliderValue}
                  onChange={(e) =>
                    handleTrashLevelChange(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div
                  className="absolute top-0 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg pointer-events-none"
                  style={{ width: `${trashSliderValue}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0% (Kosong)</span>
                <span>50% (Setengah)</span>
                <span>100% (Penuh)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <button
                onClick={() => handleTrashLevelChange(25)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                25% (Sedikit)
              </button>
              <button
                onClick={() => handleTrashLevelChange(50)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                50% (Setengah)
              </button>
              <button
                onClick={() => handleTrashLevelChange(80)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                80% (Hampir Penuh)
              </button>
              <button
                onClick={() => handleTrashLevelChange(95)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                95% (Kritis)
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">
                Status berdasarkan level:
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-400">0-49%: Normal</span>
                  <span className="text-gray-400">Status hijau</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">50-74%: Perhatian</span>
                  <span className="text-gray-400">Status biru</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">75-89%: Peringatan</span>
                  <span className="text-gray-400">Status kuning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">90-100%: Kritis</span>
                  <span className="text-gray-400">Status merah</span>
                </div>
              </div>
            </div>
          </div>
        </SimulationCard>
      </div>

      {/* Tips */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <FiSettings className="text-blue-400 text-xl mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-blue-400 font-semibold mb-2">
              Tips Penggunaan Simulator
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>
                • Gunakan simulator untuk testing response time sistem
                monitoring
              </li>
              <li>
                • Amati perubahan warna pada peta stadion saat status berubah
              </li>
              <li>
                • Log aktivitas akan terupdate otomatis untuk setiap simulasi
              </li>
              <li>
                • Alert keamanan akan reset otomatis setelah 10 detik untuk
                mencegah spam
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
