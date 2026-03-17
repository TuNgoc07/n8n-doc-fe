import React from "react";

const NavigationLayout = ({ title, active, onNavChange, children, user, onLogout }) => {
  const roles = Array.isArray(user?.roles) ? user.roles : [];
  const isPureUser = roles.includes("USER") && !roles.includes("ADMIN") && !roles.includes("EMPLOYEE");

  const navItems = isPureUser
    ? [{ id: "applyJobs", label: "Ứng tuyển", icon: "description" }]
    : [
        { id: "dashboard",  label: "Dashboard",           icon: "dashboard" },
        { id: "applyJobs",  label: "Ứng tuyển",           icon: "description" },
        { id: "recruitment",label: "Tuyển dụng",          icon: "work" },
        { id: "candidates", label: "Ứng viên & Tài liệu", icon: "group" },
        { id: "schedule",   label: "Lịch trình",          icon: "calendar_month" },
        { id: "workflow",   label: "Quy trình",           icon: "account_tree" },
        { id: "adminUsers", label: "Quản trị",            icon: "settings" },
      ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-row">
        {/* SIDEBAR */}
        <aside className="flex h-screen min-h-full flex-col bg-[#111318] p-4 w-60 sticky top-0 shrink-0">
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 px-1 py-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-base">work</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">RecruitOS</p>
                <p className="text-white/40 text-xs">Hệ thống Tuyển dụng</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mx-1" />

            {/* MENU */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavChange?.(item.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left border-none
                      ${isActive
                        ? "bg-primary/15 text-primary"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <span className={`material-symbols-outlined text-xl ${isActive ? "text-primary" : ""}`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom: user info */}
          {user && (
            <div className="mt-auto">
              <div className="h-px bg-white/5 mb-3" />
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-base">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{user.fullName || user.email}</p>
                  <p className="text-white/30 text-xs truncate">{roles[0] || "User"}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="text-white/30 hover:text-red-400 transition-colors border-none bg-transparent p-1"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* HEADER */}
          <header className="flex items-center justify-between px-8 py-4 bg-[#111318] border-b border-white/5 sticky top-0 z-10">
            <h2 className="text-white text-base font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors border-none"
                title="Thông báo"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div className="flex-1 p-6 lg:p-8 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NavigationLayout;
