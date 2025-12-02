// src/pages/WorkflowBuilderPage.jsx
import React from "react";

const WorkflowBuilderPage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark">
      {/* Top Nav Bar */}
      <header className="flex h-[60px] items-center justify-between whitespace-nowrap border-b border-solid border-border-dark bg-background-dark px-6">
        <div className="flex items-center gap-4 text-white">
          <div className="text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 28 }}
            >
              lan
            </span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Quy trình tuyển dụng
          </h2>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2">
          {/* undo / redo */}
          <ToolbarIconButton icon="undo" />
          <ToolbarIconButton icon="redo" />

          <div className="h-6 w-px bg-border-dark mx-2" />

          {/* zoom controls */}
          <ToolbarIconButton icon="zoom_in" />
          <ToolbarIconButton icon="zoom_out" />
          <ToolbarIconButton icon="fit_screen" />
        </div>

        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-surface-dark text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Lưu</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Xuất bản</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Blocks Library */}
        <aside className="flex h-full w-[300px] flex-shrink-0 flex-col border-r border-border-dark bg-background-dark">
          <div className="p-4 border-b border-border-dark">
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">
                Thư viện khối
              </h1>
              <p className="text-[#9da6b9] text-sm font-normal leading-normal">
                Kéo khối vào vùng làm việc
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-[#9da6b9] flex bg-surface-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 24 }}
                  >
                    search
                  </span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-surface-dark focus:border-none h-full placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                  placeholder="Tìm kiếm một khối"
                  defaultValue=""
                />
              </div>
            </label>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-dark cursor-pointer">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{
                      fontSize: 24,
                      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    play_circle
                  </span>
                  <p className="text-white text-sm font-medium leading-normal">
                    Kích hoạt
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-dark cursor-pointer">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: 24 }}
                  >
                    bolt
                  </span>
                  <p className="text-white text-sm font-medium leading-normal">
                    Hành động
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-dark cursor-pointer">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: 24 }}
                  >
                    account_tree
                  </span>
                  <p className="text-white text-sm font-medium leading-normal">
                    Logic
                  </p>
                </div>
              </div>

              <div className="border-t border-border-dark my-2" />

              {/* Draggable blocks (hiện tại chỉ UI, chưa có drag thực) */}
              <div className="grid grid-cols-2 gap-2">
                <BlockCard icon="mail" label="Gửi Email" />
                <BlockCard icon="add_task" label="Tạo nhiệm vụ" />
                <BlockCard
                  icon="published_with_changes"
                  label="Cập nhật trạng thái"
                />
                <BlockCard icon="assignment_ind" label="Gán người phụ trách" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main
          className="flex-1 bg-background-dark p-4 relative"
          style={{
            backgroundImage: "radial-gradient(#282e39 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#3b4354] px-10 py-16 bg-background-dark/80">
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                  Bắt đầu xây dựng quy trình của bạn
                </p>
                <p className="text-[#9da6b9] text-sm font-normal leading-normal max-w-[480px] text-center">
                  Kéo một khối &apos;Kích hoạt&apos; từ bảng bên trái vào canvas
                  này để bắt đầu.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Right: Configuration Panel */}
        <aside className="flex h-full w-[350px] flex-shrink-0 flex-col border-l border-border-dark bg-background-dark">
          <div className="p-4 border-b border-border-dark">
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">
                Cấu hình: Gửi Email
              </h1>
              <p className="text-[#9da6b9] text-sm font-normal leading-normal">
                Cài đặt cho khối được chọn
              </p>
            </div>
          </div>

          <div className="flex-1 flex-col p-4 space-y-4 overflow-y-auto">
            <div>
              <label
                htmlFor="to-email"
                className="block text-sm font-medium text-white mb-1.5"
              >
                Đến
              </label>
              <input
                id="to-email"
                type="email"
                placeholder="email_ung_vien"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border-border-dark bg-surface-dark h-10 placeholder:text-[#9da6b9] px-3 text-sm font-normal leading-normal"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-white mb-1.5"
              >
                Tiêu đề
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Xác nhận hồ sơ ứng tuyển"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border-border-dark bg-surface-dark h-10 placeholder:text-[#9da6b9] px-3 text-sm font-normal leading-normal"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-white mb-1.5"
              >
                Nội dung
              </label>
              <textarea
                id="content"
                rows={6}
                placeholder="Cảm ơn bạn đã ứng tuyển..."
                className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border-border-dark bg-surface-dark placeholder:text-[#9da6b9] p-3 text-sm font-normal leading-normal"
              />
            </div>
          </div>

          <div className="p-4 border-t border-border-dark">
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-600/20 text-red-400 hover:bg-red-600/30 text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Xóa khối</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

/* ------ small components ------ */

const ToolbarIconButton = ({ icon }) => (
  <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-surface-dark text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
    <span
      className="material-symbols-outlined text-white"
      style={{ fontSize: 20 }}
    >
      {icon}
    </span>
  </button>
);

const BlockCard = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg border border-border-dark hover:bg-surface-dark cursor-grab active:cursor-grabbing">
    <span
      className="material-symbols-outlined text-primary"
      style={{ fontSize: 28 }}
    >
      {icon}
    </span>
    <p className="text-white text-xs font-medium text-center">{label}</p>
  </div>
);

export default WorkflowBuilderPage;
