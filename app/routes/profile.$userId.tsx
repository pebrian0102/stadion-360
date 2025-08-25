import React from "react";
import { useParams } from "react-router";
import {
  FiUser,
  FiGift,
  FiTrendingUp,
  FiClock,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { data } = useSimulation();
  const { userProfile } = data;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getPointsColor = (type: "earned" | "spent") => {
    return type === "earned" ? "text-green-500" : "text-red-500";
  };

  const getPointsIcon = (type: "earned" | "spent") => {
    return type === "earned" ? (
      <FiPlus className="w-4 h-4" />
    ) : (
      <FiMinus className="w-4 h-4" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Profil Suporter</h1>
          <p className="text-gray-400 mt-1">
            ID Pengguna: {userId || userProfile.id}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri - Kartu Profil */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
            {/* Avatar dan Info Dasar */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full border-4 border-green-500 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mt-4">
                {userProfile.name}
              </h2>
              <p className="text-gray-400 text-sm">Suporter Premium</p>
            </div>

            {/* Status Poin */}
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <FiTrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-400 text-sm">
                  Saldo PoinSuporter
                </span>
              </div>
              <div className="text-4xl font-bold text-green-500 mb-1">
                {userProfile.currentPoints.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Poin Tersedia</div>
            </div>

            {/* Tombol Tukar Poin */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <FiGift className="w-5 h-5" />
              <span>Tukarkan Poin</span>
            </button>

            {/* Statistik Singkat */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">
                  {
                    userProfile.eventLog.filter((e) => e.type === "earned")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Aktivitas Positif</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">
                  {
                    userProfile.eventLog.filter((e) => e.type === "spent")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Penukaran Poin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Riwayat Poin */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Riwayat PoinSuporter
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <FiClock className="w-4 h-4" />
                <span>Aktivitas Terkini</span>
              </div>
            </div>

            {/* Tabel Riwayat */}
            <div className="overflow-hidden">
              <div className="space-y-3">
                {userProfile.eventLog.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">
                          {event.description}
                        </h4>
                        <p className="text-sm text-gray-400 flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {formatDate(event.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <div
                          className={`flex items-center space-x-1 font-bold text-lg ${getPointsColor(
                            event.type
                          )}`}
                        >
                          {getPointsIcon(event.type)}
                          <span>
                            {event.type === "earned" ? "+" : ""}
                            {event.pointsChange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Load More */}
              <div className="mt-6 text-center">
                <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-6 py-2 rounded-lg transition-colors duration-200">
                  Muat Lebih Banyak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
