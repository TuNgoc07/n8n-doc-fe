// src/pages/RecruitmentPage.jsx
import React from "react";

const RecruitmentPage = ({ onEditJob }) => {
  // nếu không truyền prop thì mặc định là hàm rỗng để không bị lỗi
  const handleEdit = onEditJob || (() => {});

  return (
    <>
      {/* Heading + button tạo mới */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <p className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
          Danh sách Vị trí Tuyển dụng
        </p>
        <button className="flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="material-symbols-outlined">add</span>
          <span className="truncate">Tạo vị trí mới</span>
        </button>
      </div>

      {/* ToolBar + Search + filter chips */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-gray-500 dark:text-gray-400 flex border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Tìm kiếm theo tên công việc..."
                defaultValue=""
              />
            </div>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-200 dark:bg-gray-800 pl-3 pr-2 text-gray-900 dark:text-white">
            <p className="text-sm font-medium leading-normal">Tất cả</p>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-transparent dark:bg-transparent pl-3 pr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
            <p className="text-sm font-medium leading-normal">Đang mở</p>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-transparent dark:bg-transparent pl-3 pr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
            <p className="text-sm font-medium leading-normal">Đã đóng</p>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-transparent dark:bg-transparent pl-3 pr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
            <p className="text-sm font-medium leading-normal">Nháp</p>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-background-light dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-800/50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Tên công việc
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Ngày đăng
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Số lượng ứng viên
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <JobRow
                title="Senior Frontend Developer"
                statusLabel="Đang mở"
                statusClass="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                date="25/10/2023"
                applicants="15 ứng viên"
                onEdit={handleEdit}
              />

              <JobRow
                title="Product Manager"
                statusLabel="Đang mở"
                statusClass="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                date="18/10/2023"
                applicants="32 ứng viên"
                onEdit={handleEdit}
              />

              <JobRow
                title="UX/UI Designer (Contract)"
                statusLabel="Đã đóng"
                statusClass="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                date="01/09/2023"
                applicants="58 ứng viên"
                onEdit={handleEdit}
              />

              <JobRow
                title="Backend Engineer (Go)"
                statusLabel="Nháp"
                statusClass="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                date="-"
                applicants="0 ứng viên"
                onEdit={handleEdit}
              />
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hiển thị <span className="font-medium">1-4</span> trên{" "}
            <span className="font-medium">20</span> kết quả
          </p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center h-8 w-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <span className="material-symbols-outlined text-xl">
                chevron_left
              </span>
            </button>
            <button className="flex items-center justify-center h-8 w-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="material-symbols-outlined text-xl">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const JobRow = ({
  title,
  statusLabel,
  statusClass,
  date,
  applicants,
  onEdit,
}) => (
  <tr>
    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">
      {title}
    </td>
    <td className="p-4">
      <span
        className={
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
          statusClass
        }
      >
        {statusLabel}
      </span>
    </td>
    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{date}</td>
    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
      {applicants}
    </td>
    <td className="p-4 text-right">
      <div className="flex justify-end items-center gap-2">
        <IconButton title="Xem chi tiết" icon="visibility" />
        {/* Nút edit: gọi onEdit */}
        <IconButton title="Chỉnh sửa" icon="edit" onClick={onEdit} />
        <IconButton title="Lưu trữ" icon="archive" />
      </div>
    </td>
  </tr>
);

const IconButton = ({ title, icon, onClick }) => (
  <button
    className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
    title={title}
    type="button"
    onClick={onClick}
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>
  </button>
);

export default RecruitmentPage;
