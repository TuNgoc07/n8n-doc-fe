// src/pages/CandidatesPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const STATUS_LABEL = {
  SUBMITTED: { label: "Mới nộp", cls: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  APPROVED: { label: "Đã duyệt", cls: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  REJECTED: { label: "Từ chối", cls: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  INTERVIEW_SCHEDULED: { label: "Đã đặt lịch", cls: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_LABEL[status] || { label: status || "—", cls: "bg-gray-100 text-gray-700" };
  return <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>;
};

const CandidatesPage = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [employees, setEmployees] = useState([]);

  // Assign modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [assignSubmitting, setAssignSubmitting] = useState(false);
  const [assignError, setAssignError] = useState("");

  // Decision modal
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionApp, setDecisionApp] = useState(null);
  const [decisionType, setDecisionType] = useState("APPROVED");
  const [decisionNote, setDecisionNote] = useState("");
  const [decisionSubmitting, setDecisionSubmitting] = useState(false);
  const [decisionError, setDecisionError] = useState("");
  const [decisionSuccess, setDecisionSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
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

  useEffect(() => { loadData(); }, []);

  const viewCv = async (id) => {
    try {
      const blob = await api.downloadApplicationBlob(id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e) {
      setError(e.message || "Không xem được CV");
    }
  };

  // --- Assign ---
  const openAssignModal = (appId) => {
    setSelectedAppId(appId);
    setSelectedEmployee("");
    setAssignError("");
    setAssignModalOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedEmployee) { setAssignError("Vui lòng chọn nhân viên"); return; }
    setAssignSubmitting(true);
    setAssignError("");
    try {
      await api.assignApplication(selectedAppId, selectedEmployee);
      setAssignModalOpen(false);
      loadData();
    } catch (e) {
      setAssignError(e.message || "Lỗi phân công");
    } finally {
      setAssignSubmitting(false);
    }
  };

  // --- Decision ---
  const openDecisionModal = (app, type) => {
    setDecisionApp(app);
    setDecisionType(type);
    setDecisionNote("");
    setDecisionError("");
    setDecisionSuccess("");
    setDecisionModalOpen(true);
  };

  const handleDecisionSubmit = async () => {
    if (!decisionApp) return;
    setDecisionSubmitting(true);
    setDecisionError("");
    setDecisionSuccess("");
    try {
      await api.processDecision(decisionApp.id, decisionType, decisionNote);
      setDecisionSuccess(decisionType === "APPROVED" ? "Đã duyệt hồ sơ thành công!" : "Đã từ chối hồ sơ.");
      setTimeout(() => { setDecisionModalOpen(false); loadData(); }, 1200);
    } catch (e) {
      setDecisionError(e.message || "Lỗi xử lý hồ sơ");
    } finally {
      setDecisionSubmitting(false);
    }
  };

  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase().trim();
    if (!q) return apps;
    return apps.filter((a) =>
      [a?.applicant?.fullName, a?.applicant?.email, a?.job?.title]
        .filter(Boolean).some((s) => String(s).toLowerCase().includes(q))
    );
  }, [apps, query]);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-white text-3xl font-bold leading-tight">Quản lý Ứng viên</h1>
          <p className="text-white/40 text-base mt-1">Xem, lọc và quản lý tất cả ứng viên trong hệ thống.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#1a2233] p-4 rounded-xl mb-6">
        <div className="flex items-center gap-2 bg-[#111318] rounded-lg px-4 h-11">
          <span className="material-symbols-outlined text-white/40">search</span>
          <input
            className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
            placeholder="Tìm theo tên, email, vị trí..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#1a2233] rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white/40 uppercase border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Ứng viên</th>
              <th className="px-6 py-3">Vị trí</th>
              <th className="px-6 py-3">Ngày nộp</th>
              <th className="px-6 py-3">CV</th>
              <th className="px-6 py-3">Phụ trách</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-white/40">Đang tải...</td></tr>
            )}
            {error && !loading && (
              <tr><td colSpan={7} className="px-6 py-4 text-red-400">{error}</td></tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-white/40">Không có dữ liệu</td></tr>
            )}
            {!loading && !error && filtered.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {(a.applicant?.fullName || a.applicant?.email || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{a.applicant?.fullName || "—"}</div>
                      <div className="text-white/40 text-xs">{a.applicant?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/80">{a.job?.title || "—"}</td>
                <td className="px-6 py-4 text-white/60 text-xs">{a.createdAt ? a.createdAt.slice(0, 10) : "—"}</td>
                <td className="px-6 py-4">
                  <button onClick={() => viewCv(a.id)} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>attach_file</span>
                    Xem CV
                  </button>
                </td>
                <td className="px-6 py-4">
                  {a.assignedEmployee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                        {a.assignedEmployee.fullName.charAt(0)}
                      </div>
                      <span className="text-white/70 text-sm">{a.assignedEmployee.fullName}</span>
                    </div>
                  ) : (
                    <span className="text-white/30 italic text-xs">Chưa phân công</span>
                  )}
                </td>
                <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDecisionModal(a, "APPROVED")}
                      disabled={a.status === "APPROVED" || a.status === "INTERVIEW_SCHEDULED"}
                      className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Duyệt"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
                    </button>
                    <button
                      onClick={() => openDecisionModal(a, "REJECTED")}
                      disabled={a.status === "REJECTED"}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Từ chối"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>cancel</span>
                    </button>
                    <button
                      onClick={() => openAssignModal(a.id)}
                      className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      title="Phân công"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Phân công */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a2233] rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-white font-semibold text-lg">Phân công hồ sơ</h3>
              <button onClick={() => setAssignModalOpen(false)} className="text-white/40 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Chọn nhân viên phụ trách</label>
                <select
                  className="w-full p-2.5 rounded-lg bg-[#111318] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">-- Chọn nhân viên --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.email}>{emp.fullName} ({emp.email})</option>
                  ))}
                </select>
              </div>
              {assignError && <p className="text-red-400 text-sm">{assignError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setAssignModalOpen(false)} className="px-4 py-2 text-sm text-white/60 hover:text-white bg-white/5 rounded-lg">Hủy</button>
                <button
                  onClick={handleAssignSubmit}
                  disabled={assignSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg"
                >
                  {assignSubmitting ? "Đang lưu..." : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Duyệt / Từ chối */}
      {decisionModalOpen && decisionApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a2233] rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-white font-semibold text-lg">
                {decisionType === "APPROVED" ? "Duyệt hồ sơ" : "Từ chối hồ sơ"}
              </h3>
              <button onClick={() => setDecisionModalOpen(false)} className="text-white/40 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-white/60 text-sm">
                Bạn đang{" "}
                <span className={decisionType === "APPROVED" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                  {decisionType === "APPROVED" ? "DUYỆT" : "TỪ CHỐI"}
                </span>{" "}
                ứng viên <span className="text-white font-medium">{decisionApp.applicant?.fullName || decisionApp.applicant?.email}</span>.
              </p>

              <div>
                <label className="block text-sm text-white/60 mb-1">Ghi chú</label>
                <textarea
                  className="w-full p-2.5 rounded-lg bg-[#111318] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="Nhập ghi chú (không bắt buộc)..."
                />
              </div>

              {decisionError && <p className="text-red-400 text-sm">{decisionError}</p>}
              {decisionSuccess && <p className="text-green-400 text-sm">{decisionSuccess}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setDecisionModalOpen(false)}
                  disabled={decisionSubmitting}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white bg-white/5 rounded-lg disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDecisionSubmit}
                  disabled={decisionSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 ${
                    decisionType === "APPROVED" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {decisionSubmitting ? "Đang xử lý..." : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidatesPage;
