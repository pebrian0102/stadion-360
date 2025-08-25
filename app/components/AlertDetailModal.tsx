import React, { useState } from "react";
import {
  FiX,
  FiMapPin,
  FiClock,
  FiUser,
  FiShield,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";
import { useSimulation } from "../context/SimulationContext";
import type { SecurityAlert } from "../context/SimulationContext";

interface AlertDetailModalProps {
  alert: SecurityAlert | null;
  isOpen: boolean;
  onClose: () => void;
}

const AlertDetailModal: React.FC<AlertDetailModalProps> = ({
  alert,
  isOpen,
  onClose,
}) => {
  const { updateAlertStatus } = useSimulation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  if (!isOpen || !alert) return null;

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleTakeAction = () => {
    setIsProcessing(true);
    setActionMessage("Mengambil tindakan...");

    setTimeout(() => {
      updateAlertStatus(alert.id, "in_progress", "Operator-001");
      setActionMessage("Tindakan telah diambil! Kasus sedang ditangani.");

      setTimeout(() => {
        setIsProcessing(false);
        setActionMessage(null);
        onClose(); // Tutup modal setelah delay
      }, 1500);
    }, 500);
  };

  const handleResolve = () => {
    setIsProcessing(true);
    setActionMessage("Menyelesaikan kasus...");

    setTimeout(() => {
      updateAlertStatus(alert.id, "resolved", "Operator-001");
      setActionMessage("Kasus telah diselesaikan!");

      setTimeout(() => {
        setIsProcessing(false);
        setActionMessage(null);
        onClose();
      }, 1500);
    }, 500);
  };

  const getStatusColor = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "new":
        return "text-red-400 bg-red-500/20";
      case "in_progress":
        return "text-yellow-400 bg-yellow-500/20";
      case "resolved":
        return "text-green-400 bg-green-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getStatusText = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "new":
        return "PERINGATAN BARU";
      case "in_progress":
        return "DALAM PENANGANAN";
      case "resolved":
        return "DISELESAIKAN";
      default:
        return "STATUS TIDAK DIKENAL";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <FiAlertTriangle className="text-2xl text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                PERINGATAN KEAMANAN - {alert.location}
              </h2>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                  alert.status
                )}`}
              >
                {getStatusText(alert.status)}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isProcessing}
          >
            <FiX className="text-xl text-gray-400" />
          </button>
        </div>

        {/* Action Feedback Banner */}
        {actionMessage && (
          <div className="p-4 bg-blue-900/50 border-b border-blue-500/30">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                ) : (
                  <FiCheck className="text-green-400 text-lg" />
                )}
              </div>
              <p className="text-blue-100 font-medium">{actionMessage}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          {alert.userName && (
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <FiUser className="mr-2" />
                Informasi Pengguna
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                  {alert.userAvatar ? (
                    <img
                      src={alert.userAvatar}
                      alt={alert.userName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-2xl text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{alert.userName}</p>
                  {alert.userBandId && (
                    <p className="text-gray-400 text-sm">
                      ID Gelang: {alert.userBandId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Alert Details */}
          <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FiShield className="mr-2" />
              Detail Peringatan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Jenis Ancaman
                </label>
                <p className="text-white font-medium">{alert.threatType}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Lokasi Spesifik
                </label>
                <p className="text-white font-medium flex items-center">
                  <FiMapPin className="mr-1 text-blue-400" />
                  {alert.location}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Waktu Terdeteksi
                </label>
                <p className="text-white font-medium flex items-center">
                  <FiClock className="mr-1 text-green-400" />
                  {formatDateTime(alert.timestamp)}
                </p>
              </div>

              {alert.assignedTo && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Ditangani Oleh
                  </label>
                  <p className="text-white font-medium">{alert.assignedTo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {alert.description && (
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Deskripsi Detail
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {alert.description}
              </p>
            </div>
          )}

          {/* Recommended Actions */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              Tindakan yang Direkomendasikan
            </h3>
            <ul className="text-yellow-100 space-y-2">
              <li>• Verifikasi identitas pengguna dan periksa kredensial</li>
              <li>
                • Lakukan inspeksi visual terhadap objek yang mencurigakan
              </li>
              <li>• Hubungi unit keamanan terdekat untuk backup</li>
              <li>• Dokumentasikan semua temuan untuk laporan</li>
            </ul>
          </div>
        </div>

        {/* Footer dengan Action Buttons */}
        <div className="p-6 border-t border-gray-700 bg-gray-900">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tutup
            </button>

            {alert.status === "new" && (
              <button
                onClick={handleTakeAction}
                disabled={isProcessing}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                )}
                <span>Ambil Tindakan</span>
              </button>
            )}

            {alert.status === "in_progress" && (
              <button
                onClick={handleResolve}
                disabled={isProcessing}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                )}
                <span>Selesaikan Kasus</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;
