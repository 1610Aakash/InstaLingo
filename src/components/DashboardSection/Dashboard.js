
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
// import { Navbar } from './Navbar';
import { DashboardMain } from './DashboardMain';
import { Footer } from './Footer';


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden shadow-xl rounded-l-2xl bg-white">
        {/* <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 transition-all duration-300">
          <Routes>
            <Route path="/" element={<DashboardMain />} />
            <Route path="*" element={<Navigate to="/" />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
