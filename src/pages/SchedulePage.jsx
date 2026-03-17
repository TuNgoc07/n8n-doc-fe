import React, { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";

function fmtDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}
function fmtDateTimeLocal(iso) {
  if (!iso) return "";
  return iso.substring(0, 16);
}
function toISOLocal(dt) { return dt + ":00"; }

export default function SchedulePage() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("ALL");
  const [modal, setModal]         = useState(null);
  const [delTarget, setDelTarget] = useState(null);

  useEffect(() => {
    api.listSchedules()
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const displayed = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((a) => {
      const matchQ = !q ||
        (a.applicant?.fullName || "").toLowerCase().includes(q) ||
        (a.applicant?.email || "").toLowerCase().includes(q) ||
        (a.job?.title || "").toLowerCase().includes(q);
      const matchF = filter === "ALL" || a.status === filter;
      return matchQ && matchF;
    });
  }, [items, search, filter]);

  const onSaved     = (u) => { setItems((p) => p.map((a) => a.id === u.id ? u : a)); setModal(null); };
  const onCancelled = (u) => { setItems((p) => p.map((a) => a.id === u.id ? u : a)); setDelTarget(null); };

  const scheduled = displayed.filter((a) => a.status === "INTERVIEW_SCHEDULED");
  const pending   = displayed.filter((a) => a.status === "APPROVED");
  const today     = items.filter((a) =>
    a.interviewTime && new Date(a.interviewTime).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Lich trinh Phong van</h1>
        <p className="text-white/40 text-sm mt-1">Dat lich phong van cho ung vien da duoc duyet CV</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="event"           label="Da dat lich"  value={items.filter(a => a.status === "INTERVIEW_SCHEDULED").length} color="text-green-400" />
        <StatCard icon="pending_actions" label="Cho dat lich" value={items.filter(a => a.status === "APPROVED").length}            color="text-yellow-400" />
        <StatCard icon="today"           label="Hom nay"      value={today}                                                        color="text-blue-400" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-1 items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 h-10 max-w-sm">
          <span className="material-symbols-outlined text-white/30 text-xl">search</span>
          <input className="flex-1 bg-transparent text-white text-sm placeholder-white/20 focus:outline-none"
            placeholder="Tim ung vien, vi tri..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {[["ALL","Tat ca"],["INTERVIEW_SCHEDULED","Da dat lich"],["APPROVED","Cho dat lich"]].map(([v, l]) => (
            <button key={v} type="button" onClick={() => setFilter(v)}
              className={"px-3 h-10 rounded-lg text-sm font-medium border transition-colors " +
                (filter === v ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-white/50 hover:border-white/30")}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {loading && <div className="text-center text-white/30 py-12">Dang tai...</div>}
      {error   && <div className="text-center text-red-400 py-12">{error}</div>}
      {!loading && !error && (
        <div className="space-y-8">
          {(filter === "ALL" || filter === "INTERVIEW_SCHEDULED") && (
            <Section title="Da dat lich" count={scheduled.length}>
              {scheduled.length === 0
                ? <Empty text="Chua co lich phong van nao." />
                : scheduled.map((a) => (
                    <InterviewCard key={a.id} app={a}
                      onEdit={() => setModal({ app: a })}
                      onCancel={() => setDelTarget(a)} />
                  ))}
            </Section>
          )}
          {(filter === "ALL" || filter === "APPROVED") && (
            <Section title="Cho dat lich" count={pending.length}>
              {pending.length === 0
                ? <Empty text="Khong co ung vien nao dang cho dat lich." />
                : pending.map((a) => (
                    <PendingCard key={a.id} app={a} onSchedule={() => setModal({ app: a })} />
                  ))}
            </Section>
          )}
        </div>
      )}
      {modal     && <ScheduleModal app={modal.app} onClose={() => setModal(null)} onSaved={onSaved} />}
      {delTarget && <CancelModal   app={delTarget}  onClose={() => setDelTarget(null)} onCancelled={onCancelled} />}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4 flex items-center gap-3">
      <span className={"material-symbols-outlined text-2xl " + color}>{icon}</span>
      <div>
        <p className="text-white text-xl font-bold">{value}</p>
        <p className="text-white/40 text-xs">{label}</p>
      </div>
    </div>
  );
}

function Section({ title, count, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wider">{title}</h2>
        <span className="bg-white/10 text-white/50 text-xs px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-white/20 text-sm py-6 text-center">{text}</p>;
}

function IconBtn({ icon, title, onClick, danger }) {
  return (
    <button type="button" title={title} onClick={onClick}
      className={"w-8 h-8 flex items-center justify-center rounded-lg border-none transition-colors " +
        (danger ? "text-white/30 hover:text-red-400 hover:bg-red-500/10" : "text-white/30 hover:text-white hover:bg-white/8")}>
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </button>
  );
}

function InterviewCard({ app, onEdit, onCancel }) {
  const isPast = app.interviewTime && new Date(app.interviewTime) < new Date();
  const day = app.interviewTime ? new Date(app.interviewTime).getDate() : "-";
  const mon = app.interviewTime ? new Date(app.interviewTime).toLocaleString("vi-VN", { month: "short" }) : "";
  return (
    <div className="bg-[#111318] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className={"shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center " + (isPast ? "bg-white/5" : "bg-primary/15")}>
        <span className={"text-xl font-bold leading-none " + (isPast ? "text-white/30" : "text-primary")}>{day}</span>
        <span className={"text-xs " + (isPast ? "text-white/20" : "text-primary/70")}>{mon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-medium">{app.applicant?.fullName || app.applicant?.email}</p>
          <span className="text-white/20 text-xs">x</span>
          <p className="text-white/50 text-sm">{app.job?.title}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 flex-wrap">
          {app.interviewTime && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <span className="material-symbols-outlined text-sm">schedule</span>{fmtTime(app.interviewTime)}
            </span>
          )}
          {app.interviewLocation && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <span className="material-symbols-outlined text-sm">location_on</span>{app.interviewLocation}
            </span>
          )}
          {app.interviewNote && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <span className="material-symbols-outlined text-sm">notes</span>{app.interviewNote}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <IconBtn icon="edit"       title="Sua lich" onClick={onEdit} />
        <IconBtn icon="event_busy" title="Huy lich" danger onClick={onCancel} />
      </div>
    </div>
  );
}

function PendingCard({ app, onSchedule }) {
  return (
    <div className="bg-[#111318] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="shrink-0 w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-yellow-400 text-2xl">person_search</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium">{app.applicant?.fullName || app.applicant?.email}</p>
        <p className="text-white/50 text-sm">{app.job?.title}</p>
        <p className="text-white/30 text-xs mt-1">CV da duyet - {fmtDate(app.createdAt)}</p>
      </div>
      <button type="button" onClick={onSchedule}
        className="shrink-0 flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors border-none">
        <span className="material-symbols-outlined text-base">event_available</span>Dat lich
      </button>
    </div>
  );
}

function ScheduleModal({ app, onClose, onSaved }) {
  const isEdit = app.status === "INTERVIEW_SCHEDULED";
  const [form, setForm] = useState({
    time:     fmtDateTimeLocal(app.interviewTime) || "",
    location: app.interviewLocation || "",
    note:     app.interviewNote || "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.time) { setErr("Vui long chon thoi gian."); return; }
    setSaving(true); setErr("");
    try {
      const updated = await api.saveSchedule(app.id, {
        time: toISOLocal(form.time), location: form.location, note: form.note,
      });
      onSaved(updated);
    } catch (ex) { setErr(ex.message); }
    finally { setSaving(false); }
  };

  return (
    <Modal title={isEdit ? "Cap nhat lich phong van" : "Dat lich phong van"} onClose={onClose}>
      <div className="mb-4 p-3 bg-white/5 rounded-lg">
        <p className="text-white text-sm font-medium">{app.applicant?.fullName || app.applicant?.email}</p>
        <p className="text-white/40 text-xs">{app.job?.title}</p>
      </div>
      {err && <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/60 text-sm mb-1.5">Thoi gian phong van *</label>
          <input type="datetime-local" required value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1.5">Dia diem / Link</label>
          <input type="text" value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            placeholder="Phong hop A / https://meet.google.com/..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1.5">Ghi chu</label>
          <textarea rows={3} value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            placeholder="Chuan bi portfolio, mang CMND..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary transition-colors resize-none" />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 bg-transparent transition-colors">Huy</button>
          <button type="submit" disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {saving ? "Dang luu..." : isEdit ? "Cap nhat" : "Dat lich"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CancelModal({ app, onClose, onCancelled }) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    try { onCancelled(await api.cancelSchedule(app.id)); }
    catch (ex) { alert("Loi: " + ex.message); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Huy lich phong van" onClose={onClose}>
      <p className="text-white/70 text-sm mb-2">
        Ban co chac muon huy lich cua{" "}
        <span className="text-white font-medium">{app.applicant?.fullName || app.applicant?.email}</span>?
      </p>
      <p className="text-white/40 text-xs mb-6">Ung vien se duoc chuyen ve trang thai Cho dat lich.</p>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 bg-transparent transition-colors">Khong</button>
        <button type="button" onClick={handleConfirm} disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors">
          {loading ? "Dang huy..." : "Huy lich"}
        </button>
      </div>
    </Modal>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold">{title}</h3>
          <button type="button" onClick={onClose}
            className="text-white/30 hover:text-white border-none bg-transparent transition-colors">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
