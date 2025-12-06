// src/pages/RecruitmentPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const RecruitmentPage = ({ onEditJob }) => {
  // nếu không truyền prop thì mặc định là hàm rỗng để không bị lỗi
  const handleEdit = onEditJob || (() => {});

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    department: "",
    active: true,
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .listJobsWithCount()
      .then((data) => {
        if (!mounted) return;
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Không tải được danh sách công việc");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } catch (_) {
      return iso;
    }
  };

  const mappedRows = useMemo(() => {
    return jobs.map((j) => ({
      key: j.id,
      title: j.title,
      statusLabel: j.active ? "Đang mở" : "Đã đóng",
      statusClass: j.active
        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      date: formatDate(j.createdAt),
      applicants: typeof j.applicantsCount === "number" ? j.applicantsCount : (j.applicantsCount || 0),
    }));
  }, [jobs]);

  const displayRows = useMemo(() => {
    const q = (searchTerm || "").trim().toLowerCase();
    if (!q) return mappedRows;
    return mappedRows.filter((r) => (r.title || "").toLowerCase().includes(q));
  }, [mappedRows, searchTerm]);

  const startEdit = async (id) => {
    try {
      const existing = jobs.find((j) => j.id === id);
      const j = existing || (await api.getJob(id));
      setEditData({
        id: j.id,
        title: j.title || "",
        description: j.description || "",
        location: j.location || "",
        department: j.department || "",
        active: !!j.active,
      });
      setEditOpen(true);
    } catch (err) {
      alert(`Không tải được dữ liệu job: ${err.message}`);
    }
  };

  const saveEdit = async () => {
    try {
      const payload = {
        title: editData.title,
        description: editData.description,
        location: editData.location,
        department: editData.department,
        active: editData.active,
      };
      const updated = await api.updateJob(editData.id, payload);
      setJobs((prev) => {
        const prevItem = prev.find((j) => j.id === updated.id);
        const merged = { ...updated, applicantsCount: prevItem?.applicantsCount ?? 0 };
        return prev.map((j) => (j.id === updated.id ? merged : j));
      });
      setEditOpen(false);
    } catch (err) {
      alert(`Cập nhật thất bại: ${err.message}`);
    }
  };

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {loading && (
                <tr>
                  <td colSpan={5} className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    Đang tải danh sách công việc...
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td colSpan={5} className="p-4 text-sm text-red-600">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && displayRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    Chưa có vị trí tuyển dụng.
                  </td>
                </tr>
              )}
              {!loading && !error &&
                displayRows.map((row) => (
                  <JobRow
                    key={row.key}
                    title={row.title}
                    statusLabel={row.statusLabel}
                    statusClass={row.statusClass}
                    date={row.date}
                    applicants={row.applicants}
                    onEdit={() => startEdit(row.key)}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hiển thị <span className="font-medium">{Math.min(displayRows.length, displayRows.length || 0)}</span> trên{" "}
            <span className="font-medium">{displayRows.length}</span> kết quả
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

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Chỉnh sửa công việc</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tiêu đề</label>
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark px-3 py-2 text-gray-900 dark:text-white"
                  value={editData.title}
                  onChange={(e) => setEditData((d) => ({ ...d, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark px-3 py-2 text-gray-900 dark:text-white"
                  value={editData.description}
                  onChange={(e) => setEditData((d) => ({ ...d, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Địa điểm</label>
                  <input
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark px-3 py-2 text-gray-900 dark:text-white"
                    value={editData.location}
                    onChange={(e) => setEditData((d) => ({ ...d, location: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phòng ban</label>
                  <input
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark px-3 py-2 text-gray-900 dark:text-white"
                    value={editData.department}
                    onChange={(e) => setEditData((d) => ({ ...d, department: e.target.value }))}
                  />
                </div>
              </div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editData.active}
                  onChange={(e) => setEditData((d) => ({ ...d, active: e.target.checked }))}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Đang mở</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setEditOpen(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-primary text-white"
                onClick={saveEdit}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
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
