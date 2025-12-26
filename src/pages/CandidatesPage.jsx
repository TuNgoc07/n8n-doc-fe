// src/pages/CandidatesPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const CandidatesPage = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [employees, setEmployees] = useState([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // Decision Modal State
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionApp, setDecisionApp] = useState(null);
  const [decisionType, setDecisionType] = useState('APPROVED'); // APPROVED or REJECTED
  const [decisionNote, setDecisionNote] = useState("");
  const [decisionFile, setDecisionFile] = useState(null);

  const viewCv = async (id) => {
    try {
      const blob = await api.downloadApplicationBlob(id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
    } catch (e) {
      alert(e.message || "Không xem được CV");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsData, employeesData] = await Promise.all([
        api.listApplicationsAdmin(),
        api.listEmployees(),
      ]);
      setApps(Array.isArray(appsData) ? appsData : []);
      setEmployees(Array.isArray(employeesData) ? employeesData : []);
    } catch (err) {
      setError(err?.message || "Không tải được danh sách ứng viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignClick = (appId) => {
    setSelectedAppId(appId);
    setSelectedEmployee("");
    setAssignModalOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedEmployee) {
      alert("Vui lòng chọn nhân viên");
      return;
    }
    try {
      await api.assignApplication(selectedAppId, selectedEmployee);
      alert("Đã phân công thành công!");
      setAssignModalOpen(false);
      loadData(); // Reload data to update UI
    } catch (e) {
      console.error("Assign error:", e);
      let msg = e.message || "Lỗi phân công";
      try {
          // Thử parse nếu là JSON string
          const json = JSON.parse(msg);
          if (json.message) msg = json.message;
      } catch {}
      alert("Lỗi: " + msg);
    }
  };

  const openDecisionModal = (app, type) => {
    setDecisionApp(app);
    setDecisionType(type);
    setDecisionNote("");
    setDecisionFile(null);
    setDecisionModalOpen(true);
  };

  const handleDecisionSubmit = async () => {
    if (!decisionApp) return;
    try {
      await api.processDecision(decisionApp.id, decisionType, decisionNote, decisionFile);
      alert("Đã xử lý hồ sơ thành công!");
      setDecisionModalOpen(false);
      loadData();
    } catch (e) {
      console.error("Decision error:", e);
      let msg = e.message || "Lỗi xử lý hồ sơ";
      try {
          const json = JSON.parse(msg);
          if (json.message) msg = json.message;
      } catch {}
      alert("Lỗi: " + msg);
    }
  };

  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase().trim();
    if (!q) return apps;
    return apps.filter((a) =>
      [a?.applicant?.fullName, a?.applicant?.email, a?.job?.title]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q))
    );
  }, [apps, query]);

  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">
            Quản lý Ứng viên
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Xem, lọc và quản lý tất cả ứng viên trong hệ thống.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            add_circle
          </span>
          <span className="truncate">Thêm ứng viên mới</span>
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-[#1a2233] p-4 rounded-xl shadow-sm mb-6">
        {/* SearchBar */}
        <div className="mb-4">
          <label className="flex flex-col w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
              <div className="text-gray-400 flex border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Tìm kiếm theo tên, email, hoặc từ khóa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">
            Bộ lọc:
          </p>

          <FilterChip
            icon="work_outline"
            label="Vị trí ứng tuyển"
          />
          <FilterChip
            icon="label_outline"
            label="Trạng thái"
          />
          <FilterChip
            icon="calendar_today"
            label="Ngày nộp hồ sơ"
          />

          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 px-3 text-red-500 dark:text-red-400 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
            <p className="text-sm font-medium leading-normal">Xóa bộ lọc</p>
          </button>
        </div>
      </div>

      {/* TABLE ứng viên */}
      <div className="overflow-x-auto bg-white dark:bg-[#1a2233] rounded-xl shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4" scope="col">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="px-6 py-3" scope="col">
                Tên Ứng viên
              </th>
              <th className="px-6 py-3" scope="col">
                Vị trí ứng tuyển
              </th>
              <th className="px-6 py-3" scope="col">
                Ngày nộp
              </th>
              <th className="px-6 py-3" scope="col">
                Tài liệu
              </th>
              <th className="px-6 py-3" scope="col">
                Người phụ trách
              </th>
              <th className="px-6 py-3" scope="col">
                Trạng thái
              </th>
              <th className="px-6 py-3" scope="col">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-6 py-3">Đang tải...</td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={7} className="px-6 py-3 text-red-600">{error}</td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-3">Không có dữ liệu</td>
              </tr>
            )}
            {!loading && !error && filtered.map((a) => (
              <tr key={a.id} className="bg-white dark:bg-[#1a2233] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  </div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{a.applicant?.fullName || a.applicant?.email}</div>
                    <div className="font-normal text-gray-500 dark:text-gray-400">{a.applicant?.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{a.job?.title}</td>
                <td className="px-6 py-4">{a.createdAt}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => viewCv(a.id)}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>attach_file</span>
                    <span>CV (PDF)</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  {a.assignedEmployee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                        {a.assignedEmployee.fullName.charAt(0)}
                      </div>
                      <span className="text-sm">{a.assignedEmployee.fullName}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Chưa phân công</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {a.status || "Mới"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDecisionModal(a, 'APPROVED')}
                      className="px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      title="Đồng ý"
                    >
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    </button>
                    <button
                      onClick={() => openDecisionModal(a, 'REJECTED')}
                      className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      title="Từ chối"
                    >
                      <span className="material-symbols-outlined text-sm">cancel</span>
                    </button>
                    <button
                      onClick={() => handleAssignClick(a.id)}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                      title="Phân công"
                    >
                      <span className="material-symbols-outlined text-sm">person_add</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav
          aria-label="Table navigation"
          className="flex items-center justify-between p-4"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Hiển thị{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            của{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-primary border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Modal Phân công */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a2233] rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Phân công hồ sơ
              </h3>
              <button
                onClick={() => setAssignModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chọn nhân viên phụ trách
              </label>
              <select
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary focus:border-primary"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">-- Chọn nhân viên --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.email}>
                    {emp.fullName} ({emp.email})
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAssignSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Duyệt/Từ chối */}
      {decisionModalOpen && decisionApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a2233] rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {decisionType === 'APPROVED' ? 'Duyệt hồ sơ' : 'Từ chối hồ sơ'}
              </h3>
              <button
                onClick={() => setDecisionModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Bạn đang <strong>{decisionType === 'APPROVED' ? 'ĐỒNG Ý' : 'TỪ CHỐI'}</strong> ứng viên <strong>{decisionApp.applicant?.fullName || decisionApp.applicant?.email}</strong>.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ghi chú
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  rows={3}
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="Nhập ghi chú..."
                />
              </div>

              {decisionType === 'APPROVED' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Offer File (nếu có)
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:text-gray-400"
                    onChange={(e) => setDecisionFile(e.target.files[0])}
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setDecisionModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDecisionSubmit}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${decisionType === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ---- small components ---- */

const FilterChip = ({ icon, label }) => (
  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 transition-colors">
    <span
      className="material-symbols-outlined text-gray-600 dark:text-gray-300"
      style={{ fontSize: 20 }}
    >
      {icon}
    </span>
    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
      {label}
    </p>
    <span
      className="material-symbols-outlined text-gray-600 dark:text-gray-300"
      style={{ fontSize: 20 }}
    >
      expand_more
    </span>
  </button>
);

const CandidateRow = ({
  checkboxId,
  avatar,
  name,
  email,
  position,
  date,
  files,
  statusLabel,
  statusClass,
}) => (
  <tr className="bg-white dark:bg-[#1a2233] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label htmlFor={checkboxId} className="sr-only">
          checkbox
        </label>
      </div>
    </td>
    <th
      scope="row"
      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={avatar}
        alt="Candidate avatar"
      />
      <div className="pl-3">
        <div className="text-base font-semibold">{name}</div>
        <div className="font-normal text-gray-500 dark:text-gray-400">
          {email}
        </div>
      </div>
    </th>
    <td className="px-6 py-4">{position}</td>
    <td className="px-6 py-4">{date}</td>
    <td className="px-6 py-4">
      <button className="flex items-center gap-1 text-primary hover:underline">
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          attach_file
        </span>
        <span>{files}</span>
      </button>
    </td>
    <td className="px-6 py-4">
      <span
        className={
          "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full " + statusClass
        }
      >
        {statusLabel}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <IconButton icon="visibility" colorHover="primary" />
        <IconButton icon="edit" colorHover="green" />
        <IconButton icon="delete" colorHover="red" />
      </div>
    </td>
  </tr>
);

const IconButton = ({ icon, colorHover }) => {
  const colorMap = {
    primary: "hover:text-primary dark:hover:text-primary-400",
    green: "hover:text-green-500 dark:hover:text-green-400",
    red: "hover:text-red-500 dark:hover:text-red-400",
  };

  return (
    <button
      type="button"
      className={
        "p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg " +
        (colorMap[colorHover] || "")
      }
    >
      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
        {icon}
      </span>
    </button>
  );
};

export default CandidatesPage;
