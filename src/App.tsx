/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ProjectManagement from "./pages/ProjectManagement";
import MaterialLibrary from "./pages/MaterialLibrary";
import AdMaterials from "./pages/AdMaterials";
import CreativeCenter from "./pages/CreativeCenter";
import CampaignManagement from "./pages/CampaignManagement";
import DataCenter from "./pages/DataCenter";
import TeamManagement from "./pages/TeamManagement";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface">
        <Sidebar />
        <Header />
        
        <main className="pl-64 pt-16 min-h-screen">
          <div className="p-8 max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectManagement />} />
              <Route path="/materials" element={<MaterialLibrary />} />
              <Route path="/ad-materials" element={<AdMaterials />} />
              <Route path="/creative" element={<CreativeCenter />} />
              <Route path="/campaigns" element={<CampaignManagement />} />
              <Route path="/data" element={<DataCenter />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
