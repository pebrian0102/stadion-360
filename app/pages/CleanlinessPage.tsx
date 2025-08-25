import React from "react";
import {
  FiTrash2,
  FiMapPin,
  FiTruck,
  FiClock,
  FiBarChart,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";

const CleanlinessPage: React.FC = () => {
  const { data } = useSimulation();

  const trashBins = [
    {
      id: "Tribun 7-A",
      level: 45,
      location: "Sektor Utara",
      lastEmpty: "2 jam lalu",
      capacity: "240L",
    },
    {
      id: "Tribun 7-B",
      level: data.trashLevel,
      location: "Sektor Utara",
      lastEmpty: "30 menit lalu",
      capacity: "240L",
    },
    {
      id: "Tribun 8-A",
      level: 32,
      location: "Sektor Selatan",
      lastEmpty: "1 jam lalu",
      capacity: "240L",
    },
    {
      id: "Tribun 8-B",
      level: 58,
      location: "Sektor Selatan",
      lastEmpty: "45 menit lalu",
      capacity: "240L",
    },
    {
      id: "Gerbang Utama",
      level: 78,
      location: "Pintu Masuk",
      lastEmpty: "3 jam lalu",
      capacity: "120L",
    },
    {
      id: "Area Parkir",
      level: 23,
      location: "Luar Stadion",
      lastEmpty: "30 menit lalu",
      capacity: "360L",
    },
  ];

  const cleaningSchedule = [
    {
      time: "15:00",
      area: "Toilet Tribun Utara",
      status: "scheduled",
      cleaner: "Tim A",
    },
    {
      time: "15:30",
      area: "Area Konsesi",
      status: "in-progress",
      cleaner: "Tim B",
    },
    {
      time: "16:00",
      area: "Tribun 7-B (Sampah)",
      status: "scheduled",
      cleaner: "Tim C",
    },
    {
      time: "16:30",
      area: "Koridor Utama",
      status: "completed",
      cleaner: "Tim A",
    },
  ];

  const getTrashColor = (level: number) => {
    if (level >= 90) return "red";
    if (level >= 75) return "yellow";
    if (level >= 50) return "blue";
    return "green";
  };

  const getTrashColorClasses = (level: number) => {
    if (level >= 90) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (level >= 75)
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (level >= 50) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Monitoring Kebersihan
          </h1>
          <p className="text-gray-400 mt-1">
            Sistem monitoring sampah dan jadwal pembersihan
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">95%</p>
            <p className="text-gray-400 text-sm">Cleanliness Score</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Tempat Sampah</p>
              <p className="text-2xl font-bold text-white">
                {trashBins.length}
              </p>
            </div>
            <FiTrash2 className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Perlu Dikosongkan</p>
              <p className="text-2xl font-bold text-white">
                {trashBins.filter((bin) => bin.level >= 75).length}
              </p>
            </div>
            <FiTruck className="text-yellow-500 text-2xl" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tim Cleaning Aktif</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <FiClock className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata Level</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(
                  trashBins.reduce((acc, bin) => acc + bin.level, 0) /
                    trashBins.length
                )}
                %
              </p>
            </div>
            <FiBarChart className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Trash Bins Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Status Tempat Sampah
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {trashBins.map((bin) => (
              <div
                key={bin.id}
                className={`p-4 rounded-lg border ${getTrashColorClasses(
                  bin.level
                )}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FiTrash2
                      className={`text-lg text-${getTrashColor(bin.level)}-500`}
                    />
                    <div>
                      <p className="font-medium text-white">{bin.id}</p>
                      <p className="text-gray-400 text-sm">📍 {bin.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{bin.level}%</p>
                    <p className="text-gray-400 text-xs">{bin.capacity}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`bg-${getTrashColor(
                      bin.level
                    )}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${bin.level}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>Terakhir dikosongkan: {bin.lastEmpty}</span>
                  {bin.level >= 75 && (
                    <span className="text-yellow-400 font-medium">
                      ⚠️ Perlu dikosongkan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Jadwal Pembersihan
          </h2>
          <div className="space-y-3">
            {cleaningSchedule.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg"
              >
                <div className="text-center">
                  <p className="text-white font-medium">{schedule.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white">{schedule.area}</p>
                  <p className="text-gray-400 text-sm">👷 {schedule.cleaner}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    schedule.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : schedule.status === "in-progress"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {schedule.status === "completed"
                    ? "Selesai"
                    : schedule.status === "in-progress"
                    ? "Berlangsung"
                    : "Terjadwal"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="text-white font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Jadwalkan Pembersihan Darurat
              </button>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                Kosongkan Tempat Sampah Kritis
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Laporan Kebersihan Harian
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaning Analytics */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Analitik Kebersihan Hari Ini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">24</p>
            <p className="text-gray-400 text-sm">Tempat Sampah Dikosongkan</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">18</p>
            <p className="text-gray-400 text-sm">Area Dibersihkan</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">450kg</p>
            <p className="text-gray-400 text-sm">Total Sampah Diangkut</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">3.2 jam</p>
            <p className="text-gray-400 text-sm">Rata-rata Waktu Response</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanlinessPage;
