import React, { createContext, useContext, useState, useEffect } from "react";

// Interface untuk data grafik
interface ChartData {
  securityTrend: Array<{ date: string; alerts: number }>;
  cleanlinessData: Array<{ sector: string; cleanliness: number; fill: string }>;
}

// Interface untuk security alerts
interface SecurityAlert {
  id: string;
  location: string; // e.g., "Gerbang 4"
  threatType: string; // e.g., "Anomali Kimia"
  timestamp: Date;
  status: "new" | "in_progress" | "resolved";
  assignedTo?: string; // Operator ID
  userBandId?: string; // ID Gelang user
  userName?: string; // Nama user
  userAvatar?: string; // Avatar user
  description?: string; // Deskripsi detail
}

// Interface untuk profil pengguna
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  currentPoints: number;
  eventLog: Array<{
    id: string;
    description: string;
    pointsChange: number;
    timestamp: Date;
    type: "earned" | "spent";
  }>;
}

// Interface untuk data simulasi
interface SimulationData {
  totalVisitors: number;
  securityStatus: "Aman" | "Peringatan" | "Bahaya";
  trashLevel: number;
  activeAlerts: number;
  gateStatuses: { [key: string]: "normal" | "warning" | "alert" };
  activities: ActivityLog[];
  chartData: ChartData;
  userProfile: UserProfile;
  securityAlerts: SecurityAlert[]; // Tambahan untuk alerts detail
  selectedAlert?: SecurityAlert; // Alert yang sedang dipilih
  highlightedGate?: string; // Gate yang sedang di-highlight di map
}

interface ActivityLog {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
  timestamp: Date;
  location?: string;
}

interface SimulationContextType {
  data: SimulationData;
  updateData: (updates: Partial<SimulationData>) => void;
  addActivity: (activity: Omit<ActivityLog, "id" | "timestamp">) => void;
  simulateSecurityAlert: () => void;
  simulateTrashLevel: (level: number) => void;
  simulateVisitorExit: () => void;
  // Security alert functions
  addSecurityAlert: (
    alert: Omit<SecurityAlert, "id" | "timestamp" | "status">
  ) => void;
  updateAlertStatus: (
    alertId: string,
    status: SecurityAlert["status"],
    assignedTo?: string
  ) => void;
  selectAlert: (alert: SecurityAlert | undefined) => void;
  highlightGate: (gateName: string | undefined) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

// Data awal
const initialData: SimulationData = {
  totalVisitors: 45231,
  securityStatus: "Aman",
  trashLevel: 65,
  activeAlerts: 0,
  gateStatuses: {
    "Gerbang 1": "normal",
    "Gerbang 2": "normal",
    "Gerbang 3": "normal",
    "Gerbang 4": "normal",
  },
  chartData: {
    securityTrend: [
      { date: "15 Jul", alerts: 2 },
      { date: "16 Jul", alerts: 1 },
      { date: "17 Jul", alerts: 4 },
      { date: "18 Jul", alerts: 3 },
      { date: "19 Jul", alerts: 1 },
      { date: "20 Jul", alerts: 2 },
      { date: "21 Jul", alerts: 0 },
      { date: "22 Jul", alerts: 1 },
    ],
    cleanlinessData: [
      { sector: "Sektor A", cleanliness: 92, fill: "#10b981" },
      { sector: "Sektor B", cleanliness: 78, fill: "#3b82f6" },
      { sector: "Sektor C", cleanliness: 85, fill: "#8b5cf6" },
      { sector: "Sektor D", cleanliness: 69, fill: "#f59e0b" },
      { sector: "Sektor E", cleanliness: 94, fill: "#06b6d4" },
    ],
  },
  userProfile: {
    id: "123",
    name: "Budi Santoso",
    avatar:
      "https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff&size=128",
    currentPoints: 2450,
    eventLog: [
      {
        id: "1",
        description: "Melewati Gerbang Keamanan",
        pointsChange: 10,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: "earned",
      },
      {
        id: "2",
        description: "Membuang Sampah pada Tempatnya",
        pointsChange: 25,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: "earned",
      },
      {
        id: "3",
        description: "Menukar Poin untuk Merchandise",
        pointsChange: -100,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        type: "spent",
      },
      {
        id: "4",
        description: "Check-in Tepat Waktu",
        pointsChange: 15,
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        type: "earned",
      },
      {
        id: "5",
        description: "Melaporkan Fasilitas Rusak",
        pointsChange: 50,
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        type: "earned",
      },
    ],
  },
  securityAlerts: [], // Daftar alert keamanan
  activities: [
    {
      id: "1",
      type: "success",
      message: "Pindai aman di Gerbang 4",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      location: "Gerbang 4",
    },
    {
      id: "2",
      type: "info",
      message: "Tempat sampah di Tribun 7-B sudah 85% penuh",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      location: "Tribun 7-B",
    },
    {
      id: "3",
      type: "success",
      message: "Sistem keamanan beroperasi normal",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
  ],
};

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<SimulationData>(initialData);

  const updateData = (updates: Partial<SimulationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const addActivity = (activity: Omit<ActivityLog, "id" | "timestamp">) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setData((prev) => ({
      ...prev,
      activities: [newActivity, ...prev.activities.slice(0, 9)], // Keep only last 10 activities
    }));
  };

  const simulateSecurityAlert = () => {
    const gates = ["Gerbang 1", "Gerbang 2", "Gerbang 3", "Gerbang 4"];
    const threats = ["Anomali Kimia", "Objek Mencurigakan", "Akses Tidak Sah"];
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
    ];

    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    addSecurityAlert({
      location: randomGate,
      threatType: randomThreat,
      userName: randomUser.name,
      userBandId: randomUser.bandId,
      userAvatar: randomUser.avatar,
      description: `Sistem telah mendeteksi ${randomThreat.toLowerCase()} melalui sensor keamanan otomatis di ${randomGate}.`,
    });
  };

  const simulateTrashLevel = (level: number) => {
    updateData({ trashLevel: level });

    let message = "";
    let type: "success" | "info" | "warning" | "error" = "info";

    if (level >= 90) {
      message =
        "Tempat sampah di Tribun 7-B hampir penuh! Perlu dikosongkan segera.";
      type = "error";
    } else if (level >= 75) {
      message = `Tempat sampah di Tribun 7-B ${level}% penuh`;
      type = "warning";
    } else if (level >= 50) {
      message = `Level sampah di Tribun 7-B: ${level}%`;
      type = "info";
    } else {
      message = `Tempat sampah di Tribun 7-B telah dikosongkan (${level}%)`;
      type = "success";
    }

    addActivity({
      type,
      message,
      location: "Tribun 7-B",
    });
  };

  const simulateVisitorExit = () => {
    const exitCount = Math.floor(Math.random() * 500) + 100;
    const newTotal = Math.max(0, data.totalVisitors - exitCount);

    updateData({ totalVisitors: newTotal });

    addActivity({
      type: "info",
      message: `${exitCount} pengunjung keluar stadion. Total sekarang: ${newTotal.toLocaleString()}`,
    });
  };

  // Security alert functions
  const addSecurityAlert = (
    alert: Omit<SecurityAlert, "id" | "timestamp" | "status">
  ) => {
    const newAlert: SecurityAlert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: "new",
    };

    setData((prev) => ({
      ...prev,
      securityAlerts: [newAlert, ...prev.securityAlerts],
      activeAlerts: prev.activeAlerts + 1,
      securityStatus: "Peringatan",
      gateStatuses: {
        ...prev.gateStatuses,
        [alert.location]: "alert",
      },
    }));

    addActivity({
      type: "error",
      message: `${alert.threatType} terdeteksi di ${alert.location}!`,
      location: alert.location,
    });
  };

  const updateAlertStatus = (
    alertId: string,
    status: SecurityAlert["status"],
    assignedTo?: string
  ) => {
    setData((prev) => {
      const updatedAlerts = prev.securityAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, status, assignedTo } : alert
      );

      const activeCount = updatedAlerts.filter(
        (alert) => alert.status !== "resolved"
      ).length;

      return {
        ...prev,
        securityAlerts: updatedAlerts,
        activeAlerts: activeCount,
        securityStatus: activeCount > 0 ? "Peringatan" : "Aman",
      };
    });

    // Tambahkan feedback untuk semua status changes
    const alert = data.securityAlerts.find((a) => a.id === alertId);
    if (alert) {
      if (status === "in_progress") {
        addActivity({
          type: "warning",
          message: `${assignedTo} sedang menangani kasus ${alert.threatType} di ${alert.location}`,
          location: alert.location,
        });
      } else if (status === "resolved") {
        setData((prev) => ({
          ...prev,
          gateStatuses: {
            ...prev.gateStatuses,
            [alert.location]: "normal",
          },
        }));

        addActivity({
          type: "success",
          message: `Kasus ${alert.threatType} di ${alert.location} telah diselesaikan oleh ${assignedTo}`,
          location: alert.location,
        });
      }
    }
  };

  const selectAlert = (alert: SecurityAlert | undefined) => {
    setData((prev) => ({
      ...prev,
      selectedAlert: alert,
    }));
  };

  const highlightGate = (gateName: string | undefined) => {
    setData((prev) => ({
      ...prev,
      highlightedGate: gateName,
    }));
  };

  return (
    <SimulationContext.Provider
      value={{
        data,
        updateData,
        addActivity,
        simulateSecurityAlert,
        simulateTrashLevel,
        simulateVisitorExit,
        addSecurityAlert,
        updateAlertStatus,
        selectAlert,
        highlightGate,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};

export type {
  SimulationData,
  ActivityLog,
  ChartData,
  UserProfile,
  SecurityAlert,
};
