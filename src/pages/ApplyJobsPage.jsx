import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ApplyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await api.listJobsWithCount();
      setJobs(list || []);
    } catch (e) {
      setError(e.message || "Không tải được danh sách việc làm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setNotes("");
    setFile(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setNotes("");
    setFile(null);
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const submitCv = async () => {
    if (!selectedJob) return;
    if (!file) {
      alert("Vui lòng chọn file PDF để nộp");
      return;
    }
    // khuyến nghị PDF
    const isPdf = file.type === "application/pdf" || (file.name || "").toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      if (!confirm("File không phải PDF. Bạn vẫn muốn nộp?")) return;
    }
    try {
      setSubmitting(true);
      await api.submitApplication(selectedJob.id, notes, file);
      closeModal();
      await fetchJobs(); // cập nhật lại số lượng ứng viên
      alert("Nộp CV thành công!");
    } catch (e) {
      alert(e.message || "Nộp CV thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Danh sách vị trí đang tuyển</h3>
        <button
          onClick={fetchJobs}
          className="px-3 py-2 rounded-lg bg-[#282e39] hover:bg-[#3a4152] text-sm"
        >
          Làm mới
        </button>
      </div>

      {loading ? (
        <div>Đang tải danh sách...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[#282e39]">
                <th className="py-2 pr-4">Vị trí</th>
                <th className="py-2 pr-4">Phòng ban</th>
                <th className="py-2 pr-4">Địa điểm</th>
                <th className="py-2 pr-4">Số ứng viên</th>
                <th className="py-2 pr-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-[#1c2130]">
                  <td className="py-2 pr-4">{j.title}</td>
                  <td className="py-2 pr-4">{j.department}</td>
                  <td className="py-2 pr-4">{j.location}</td>
                  <td className="py-2 pr-4">{j.applicantsCount || 0}</td>
                  <td className="py-2 pr-4">
                    <button
                      className="px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary/90"
                      onClick={() => openModal(j)}
                    >
                      Nộp CV
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td className="py-4" colSpan={5}>
                    Hiện chưa có vị trí đang mở.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#111318] rounded-lg p-6 w-full max-w-lg">
            <h4 className="text-base font-semibold mb-2">Nộp CV cho: {selectedJob.title}</h4>
            <div className="text-sm text-[#9da6b9] mb-4">
              Phòng ban: {selectedJob.department} • Địa điểm: {selectedJob.location}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Ghi chú (tuỳ chọn)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-20 rounded-lg bg-[#282e39] text-white p-2 border-none outline-none"
                  placeholder="Ví dụ: Mức lương kỳ vọng, thời gian có thể bắt đầu, ..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Chọn file CV (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={onFileChange}
                  className="block w-full text-white"
                />
                {file && (
                  <div className="text-xs text-[#9da6b9] mt-1">
                    Đã chọn: {file.name} ({Math.round(file.size / 1024)} KB)
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-3 py-2 rounded-lg bg-[#282e39] hover:bg-[#3a4152] text-sm"
                disabled={submitting}
              >
                Huỷ
              </button>
              <button
                onClick={submitCv}
                className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm"
                disabled={submitting}
              >
                {submitting ? "Đang nộp..." : "Nộp CV"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}