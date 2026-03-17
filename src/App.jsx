import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationLayout from "./components/NavigationLayout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import CandidatesPage from "./pages/CandidatesPage";
import SchedulePage from "./pages/SchedulePage";
import AdminUsersPage from "./pages/UserAdministrationPage";
import WorkflowBuilderPage from "./pages/WorkflowBuilderPage";
import ApplyJobsPage from "./pages/ApplyJobsPage";

// Layout wrapper dùng React Router
function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const roles = Array.isArray(user?.roles) ? user.roles : [];
  const isPureUser = roles.includes("USER") && !roles.includes("ADMIN") && !roles.includes("EMPLOYEE");

  // Map pathname → menu key
  const pathToMenu = {
    "/dashboard": "dashboard",
    "/apply": "applyJobs",
    "/recruitment": "recruitment",
    "/candidates": "candidates",
    "/schedule": "schedule",
    "/admin/users": "adminUsers",
    "/workflow": "workflow",
  };
  const menuToPath = Object.fromEntries(Object.entries(pathToMenu).map(([k, v]) => [v, k]));

  const activeMenu = pathToMenu[location.pathname] || "dashboard";

  const getTitle = () => {
    switch (activeMenu) {
      case "recruitment":   return "Danh sách Vị trí Tuyển dụng";
      case "candidates":    return "Quản lý Ứng viên & Tài liệu";
      case "adminUsers":    return "Quản lý Người dùng & Phân quyền";
      case "workflow":      return "Quy trình";
      case "schedule":      return "Lịch trình Phỏng vấn";
      case "applyJobs":     return "Ứng tuyển vị trí";
      default:              return "Dashboard Tổng quan";
    }
  };

  const handleNavChange = (menuKey) => {
    const path = menuToPath[menuKey];
    if (path) navigate(path);
  };

  return (
    <NavigationLayout
      title={getTitle()}
      active={activeMenu}
      onNavChange={handleNavChange}
      user={user}
      onLogout={() => { logout(); navigate("/login", { replace: true }); }}
    >
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute requireRoles={["ADMIN", "EMPLOYEE"]}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/apply" element={
          <ProtectedRoute>
            <ApplyJobsPage />
          </ProtectedRoute>
        } />
        <Route path="/recruitment" element={
          <ProtectedRoute requireRoles={["ADMIN", "EMPLOYEE"]}>
            <RecruitmentPage />
          </ProtectedRoute>
        } />
        <Route path="/candidates" element={
          <ProtectedRoute requireRoles={["ADMIN", "EMPLOYEE"]}>
            <CandidatesPage />
          </ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute requireRoles={["ADMIN", "EMPLOYEE"]}>
            <SchedulePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute requireRoles={["ADMIN"]}>
            <AdminUsersPage />
          </ProtectedRoute>
        } />
        <Route path="/workflow" element={
          <ProtectedRoute requireRoles={["ADMIN", "EMPLOYEE"]}>
            <WorkflowBuilderPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <Navigate to={isPureUser ? "/apply" : "/dashboard"} replace />
        } />
      </Routes>
    </NavigationLayout>
  );
}

// Root: tách login/register ra ngoài layout
function RootRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
        <div className="flex items-center gap-3 text-white/40">
          <span className="material-symbols-outlined">progress_activity</span>
          Đang tải...
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      <Route path="/*" element={
        user ? <AppLayout /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
}
