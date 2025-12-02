// src/App.jsx
import React, { useState } from "react";
import NavigationLayout from "./components/NavigationLayout";
import DashboardPage from "./pages/DashboardPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import CandidatesPage from "./pages/CandidatesPage";
import SchedulePage from "./pages/SchedulePage";
import AdminUsersPage from "./pages/UserAdministrationPage";
import WorkflowBuilderPage from "./pages/WorkflowBuilderPage";
import JobDetailPage from "./pages/JobDetailPage";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  // 'recruitmentList' | 'jobDetail'
  const [activePage, setActivePage] = useState("recruitmentList");

  const handleNavChange = (menuKey) => {
    setActiveMenu(menuKey);

    // Khi chuyển sang menu Tuyển dụng thì luôn quay về danh sách
    if (menuKey === "recruitment") {
      setActivePage("recruitmentList");
    }
  };

  const getTitle = () => {
    switch (activeMenu) {
      case "recruitment":
        return activePage === "jobDetail"
          ? "Chi tiết Vị trí Tuyển dụng"
          : "Danh sách Vị trí Tuyển dụng";
      case "candidates":
        return "Quản lý Ứng viên & Tài liệu";
      case "adminUsers":
        return "Quản lý Người dùng & Phân quyền";
      case "workflow":
        return "Quy trình";
      case "schedule":
        return "Lịch trình Phỏng vấn";
      case "documents":
        return "Tài liệu";
      case "dashboard":
      default:
        return "Dashboard Tổng quan";
    }
  };

  return (
    <NavigationLayout
      title={getTitle()}
      active={activeMenu}
      onNavChange={handleNavChange}
    >
      {activeMenu === "dashboard" && <DashboardPage />}

      {activeMenu === "recruitment" &&
        (activePage === "recruitmentList" ? (
          <RecruitmentPage onEditJob={() => setActivePage("jobDetail")} />
        ) : (
          <JobDetailPage />
        ))}

      {activeMenu === "candidates" && <CandidatesPage />}
      {activeMenu === "schedule" && <SchedulePage />}
      {activeMenu === "adminUsers" && <AdminUsersPage />}
      {activeMenu === "workflow" && <WorkflowBuilderPage />}

      {/* Sau này có thể thêm:
          {activeMenu === "documents" && <DocumentsPage />}
      */}
    </NavigationLayout>
  );
}
