import React from "react";
import { FiUsers, FiShield, FiTrash2, FiAlertCircle } from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";
import StatCard from "../components/StatCard";
import StadiumMap from "../components/StadiumMap";
import ActivityLog from "../components/ActivityLog";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage: React.FC = () => {
  const { data } = useSimulation();

  const getSecurityColor = (status: string) => {
    switch (status) {
      case "Aman":
        return "green";
      case "Peringatan":
        return "yellow";
      case "Bahaya":
        return "red";
      default:
        return "blue";
    }
  };

  const getTrashColor = (level: number) => {
    if (level >= 90) return "red";
    if (level >= 75) return "yellow";
    if (level >= 50) return "blue";
    return "green";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard Stadion 360°
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoring real-time kondisi stadion •{" "}
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400">Sistem Online</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Penonton"
          value={data.totalVisitors}
          icon={FiUsers}
          color="blue"
          trend={{ value: -2.5, isPositive: false }}
        />

        <StatCard
          title="Status Keamanan"
          value={data.securityStatus}
          icon={FiShield}
          color={getSecurityColor(data.securityStatus) as any}
        />

        <StatCard
          title="Level Sampah Rata-rata"
          value={`${data.trashLevel}%`}
          icon={FiTrash2}
          color={getTrashColor(data.trashLevel) as any}
        />

        <StatCard
          title="Alert Aktif"
          value={data.activeAlerts}
          icon={FiAlertCircle}
          color={data.activeAlerts > 0 ? "red" : "green"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Trend Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tren Peringatan Keamanan (7 Hari Terakhir)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData.securityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="alerts"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#EF4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cleanliness Bar Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tingkat Kebersihan per Sektor
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData.cleanlinessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="sector"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                  formatter={(value) => [`${value}%`, "Kebersihan"]}
                />
                <Bar dataKey="cleanliness" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stadium Map - Takes 2 columns */}
        <div className="lg:col-span-2">
          <StadiumMap />
        </div>

        {/* Activity Log - Takes 1 column */}
        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Status Gerbang
          </h3>
          <div className="space-y-3">
            {Object.entries(data.gateStatuses).map(([gate, status]) => (
              <div key={gate} className="flex items-center justify-between">
                <span className="text-gray-300">{gate}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "normal"
                      ? "bg-green-500/20 text-green-400"
                      : status === "warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {status === "normal"
                    ? "Normal"
                    : status === "warning"
                    ? "Peringatan"
                    : "Alert"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Statistik Hari Ini
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Pengunjung Masuk</span>
              <span className="text-white font-medium">47,856</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pengunjung Keluar</span>
              <span className="text-white font-medium">2,625</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Incident Resolved</span>
              <span className="text-green-400 font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sampah Dikosongkan</span>
              <span className="text-blue-400 font-medium">8 kali</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Lihat Detail Keamanan
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
              Export Laporan
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Buka Simulator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
