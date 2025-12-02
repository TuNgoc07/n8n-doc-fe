// src/components/NavigationLayout.jsx
import React from "react";

const NavigationLayout = ({
  title = "Dashboard",
  active = "dashboard",
  onNavChange,
  children,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "recruitment", label: "Tuyển dụng", icon: "work" },
    { id: "workflow", label: "Quy trình", icon: "account_tree" },
    { id: "candidates", label: "Ứng viên & Tài liệu", icon: "group" },
    { id: "schedule", label: "Lịch trình", icon: "calendar_month" },
    { id: "adminUsers", label: "Quản trị hệ thống", icon: "settings" }, // <- thêm

  ];

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    if (onNavChange) onNavChange(id);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-row">
        {/* SIDEBAR */}
        <aside className="flex h-screen min-h-full flex-col bg-[#111318] p-4 w-64 sticky top-0">
          <div className="flex flex-col gap-4">
            {/* Logo + tên công ty */}
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="Company Logo"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNoa4rLd8QzDQIZFZOM7_wKeTA4NBqEVPwKZWQxo6e8T7vpeYf89A9VKt7zBIBbHjYQS2ugxAure5WVXYpOvTj-zTe4VFxaxBn95gpB8S-MiB1HlAs9f5Tj3Hz9DcCao65vN5moOGPbF56HY2rqRkhh5txK1hahZrh2ENdk9mHiSIZ1vPQXjgCISjv5bUfVzl4y2SPiOxNTVnijkc-628W1hIVHMkqOeowM0d1HRfmmfga97ErbGcjKZVbxUgv-I5F8k2rKwe0uVY")',
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-base font-medium leading-normal">
                  Tên Công Ty
                </h1>
                <p className="text-[#9da6b9] text-sm font-normal leading-normal">
                  Hệ thống Vận hành
                </p>
              </div>
            </div>

            {/* MENU */}
            <nav className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => {
                const isActive = active === item.id;
                const base =
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium leading-normal";
                const activeClass = "bg-primary/20 text-primary";
                const normalClass = "text-white hover:bg-[#282e39]";
                return (
                  <a
                    key={item.id}
                    href="#"
                    onClick={handleNavClick(item.id)}
                    className={`${base} ${
                      isActive ? activeClass : normalClass
                    }`}
                  >
                    <span
                      className={
                        "material-symbols-outlined" +
                        (isActive ? " fill text-primary" : "")
                      }
                    >
                      {item.icon}
                    </span>
                    <p>{item.label}</p>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Menu dưới cùng */}
          <div className="mt-auto flex flex-col gap-1">
            <a
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#282e39] rounded-lg"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium leading-normal">Cài đặt</p>
            </a>
          </div>
        </aside>

        {/* MAIN + HEADER */}
        <main className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] px-10 py-3 bg-[#111318] sticky top-0 z-10">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined text-xl">
                  space_dashboard
                </span>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  {title}
                </h2>
              </div>
              {/* ô search */}
              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#9da6b9] flex border-none bg-[#282e39] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#282e39] focus:border-none h-full placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    placeholder="Search..."
                  />
                </div>
              </label>
            </div>

            {/* Action bên phải */}
            <div className="flex flex-1 justify-end gap-4 items-center">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-[#282e39] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="User Avatar"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeZjHcDmIulBLKDko3HB-WRU90LhzY1j6GPlU4NAeyecXkTuD3yO_yozCChGjyHvqNSnAtJATHBBl5uBPiwQBzNEJtWLx6NX2gF2urb7akZPp_tXkBiszR5MjG2sux9ZOsURfRyFAqxPwK3yNu5lrTuaKLnQD-VQNwus0cQz3LvBt1KfovqsFlZ6-GyNhj2d0jzNmKeRTMs-K5KU5WgQOqDyYe0EJZvvDKrfgdneHHfJrmNwQC4R-6_rLCIQEZF5HQeN2bQNdeQ88")',
                }}
              />
              <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined">login</span>
                <span>Login</span>
              </button>
            </div>
          </header>

          {/* NỘI DUNG TRANG */}
          <div className="p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default NavigationLayout;
