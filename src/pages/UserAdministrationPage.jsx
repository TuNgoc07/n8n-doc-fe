import React, { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";

const ROLE_STYLES = {
  ADMIN:     "bg-blue-500/15 text-blue-400",
  EMPLOYEE:  "bg-purple-500/15 text-purple-400",
  USER:      "bg-gray-500/15 text-gray-400",
  APPLICANT: "bg-green-500/15 text-green-400",
};

export default function UserAdministrationPage() {
  const [users, setUsers]         = useState([]);
  const [roles, setRoles]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  // Modal state
  const [editUser, setEditUser]   = useState(null); // { id, fullName, email, roles[] }
  const [editRoles, setEditRoles] = useState([]);
  const [saving, setSaving]       = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    Promise.all([api.listUsers(), api.listRoles()])
      .then(([u, r]) => {
        setUsers(Array.isArray(u) ? u : []);
        setRoles(Array.isArray(r) ? r : []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const displayed = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchSearch = !q ||
        (u.fullName || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q);
      const matchRole = filterRole === "ALL" ||
        (Array.isArray(u.roles) && u.roles.includes(filterRole));
      return matchSearch && matchRole;
    });
  }, [users, search, filterRole]);

  const openEdit = (user) => {
    setEditUser(user);
    setEditRoles(Array.isArray(user.roles) ? [...user.roles] : []);
  };

  const saveRoles = async () => {
    setSaving(true);
    try {
      const updated = await api.updateUserRoles(editUser.id, editRoles);
      setUsers((prev) => prev.map((u) => u.id === updated.id ? updated : u));
      setEditUser(null);
    } catch (e) {
      alert("Lỗi: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      alert("Lỗi: " + e.message);
    }
  };

  const toggleRole = (role) => {
    setEditRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Quản lý Người dùng</h1>
          <p className="text-white/40 text-sm mt-1">Phân quyền và quản lý tài khoản hệ thống</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex flex-1 items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 h-10 max-w-sm">
          <span className="material-symbols-outlined text-white/30 text-xl">search</span>
          <input
            className="flex-1 bg-transparent text-white text-sm placeholder-white/20 focus:outline-none"
            placeholder="Tìm theo tên, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 h-10 focus:outline-none focus:border-primary"
          >
            <option value="ALL">Tất cả vai trò</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111318] rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/30 text-sm">Đang tải...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400 text-sm">{error}</div>
        ) : displayed.length === 0 ? (
          <div className="p-8 text-center text-white/30 text-sm">Không có người dùng nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-white/5">
                <tr className="text-white/30 text-xs uppercase">
                  <th className="px-5 py-3 font-medium">Người dùng</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Vai trò</th>
                  <th className="px-5 py-3 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayed.map((u) => (
                  <tr key={u.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-primary text-sm font-semibold">
                            {(u.fullName || u.email || "?")[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">{u.fullName || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-white/50">{u.email}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(u.roles || []).map((r) => (
                          <span
                            key={r}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_STYLES[r] || "bg-white/10 text-white/60"}`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <IconBtn icon="manage_accounts" title="Phân quyền" onClick={() => openEdit(u)} />
                        <IconBtn icon="delete" title="Xóa" danger onClick={() => setDeleteTarget(u)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {!loading && !error && (
          <div className="px-5 py-3 border-t border-white/5 text-white/30 text-xs">
            {displayed.length} / {users.length} người dùng
          </div>
        )}
      </div>

      {/* Edit roles modal */}
      {editUser && (
        <Modal title="Phân quyền người dùng" onClose={() => setEditUser(null)}>
          <div className="mb-4">
            <p className="text-white font-medium">{editUser.fullName || editUser.email}</p>
            <p className="text-white/40 text-sm">{editUser.email}</p>
          </div>
          <p className="text-white/60 text-sm mb-3">Chọn vai trò:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {roles.map((r) => {
              const active = editRoles.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRole(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                    ${active
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                    }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 bg-transparent transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={saveRoles}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <Modal title="Xác nhận xóa" onClose={() => setDeleteTarget(null)}>
          <p className="text-white/70 text-sm mb-6">
            Bạn có chắc muốn xóa tài khoản{" "}
            <span className="text-white font-medium">{deleteTarget.fullName || deleteTarget.email}</span>?
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 bg-transparent transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Xóa
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function IconBtn({ icon, title, onClick, danger }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-lg border-none transition-colors
        ${danger
          ? "text-white/30 hover:text-red-400 hover:bg-red-500/10"
          : "text-white/30 hover:text-white hover:bg-white/8"
        }`}
    >
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </button>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/30 hover:text-white border-none bg-transparent transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
