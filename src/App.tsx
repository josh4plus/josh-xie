/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import MaterialLibrary from "./pages/MaterialLibrary";
import CreativeCenter from "./pages/CreativeCenter";
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
              <Route path="/materials" element={<MaterialLibrary />} />
              <Route path="/creative" element={<CreativeCenter />} />
              <Route path="/campaigns" element={<div className="p-8 text-center bg-white rounded-2xl shadow-sm"><h2 className="text-2xl font-bold font-headline mb-4">投放管理中...</h2><p className="text-outline">该模块正在紧锣密鼓开发中，敬请期待。</p></div>} />
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
