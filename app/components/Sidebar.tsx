import React from "react";
import { NavLink } from "react-router";
import { FiGrid, FiShield, FiTrash2, FiTerminal, FiUser } from "react-icons/fi";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: FiGrid,
      description: "Gambaran umum stadion",
    },
    {
      name: "Keamanan",
      path: "/security",
      icon: FiShield,
      description: "Monitoring keamanan",
    },
    {
      name: "Kebersihan",
      path: "/cleanliness",
      icon: FiTrash2,
      description: "Status kebersihan",
    },
    {
      name: "Simulator",
      path: "/simulator",
      icon: FiTerminal,
      description: "Kontrol simulasi",
    },
    {
      name: "Profil Suporter",
      path: "/profile/123",
      icon: FiUser,
      description: "PoinSuporter & Riwayat",
    },
  ];

  return (
    <div
      className={`bg-gray-800 border-r border-gray-700 h-screen flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {/* Logo sederhana */}
          <div className="w-10 h-10 bg-white from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logo360_2.png" alt="Logo" />
            {/* <FiGrid className="text-white text-xl" /> */}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Stadion 360°</h1>
            <p className="text-xs text-gray-400">Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <IconComponent
                    className={`text-lg transition-transform duration-200 group-hover:scale-110`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          <p>© 2025 Stadion 360°</p>
          <p className="mt-1">Real-time Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
