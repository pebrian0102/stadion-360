import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { SimulationProvider } from "../context/SimulationContext";

const MainLayout: React.FC = () => {
  return (
    <SimulationProvider>
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SimulationProvider>
  );
};

export default MainLayout;
