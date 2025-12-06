// Simple API client for frontend-only auth flow
const API_BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("auth_token") || null;
}

function setToken(token) {
  if (token) localStorage.setItem("auth_token", token);
  else localStorage.removeItem("auth_token");
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    // Include cookies if backend uses cookie-based session auth
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = text || res.statusText;
    throw new Error(message);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export const api = {
  setToken,
  getToken,
  async listJobs() {
    return request("/jobs", { method: "GET" });
  },
  async listJobsWithCount() {
    return request("/jobs/with-count", { method: "GET" });
  },
  async getJob(id) {
    return request(`/jobs/${id}`, { method: "GET" });
  },
  async updateJob(id, payload) {
    return request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  async login(email, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  async me() {
    return request("/auth/me", { method: "GET" });
  },
  async listApplicationsAdmin() {
    return request("/applications", { method: "GET" });
  },
  applicationDownloadUrl(id) {
    return `${API_BASE}/applications/${id}/download`;
  },
  async downloadApplicationBlob(id) {
    const token = getToken();
    const res = await fetch(`${API_BASE}/applications/${id}/download`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || res.statusText);
    }
    return res.blob();
  },
  async submitApplication(jobId, notes, file) {
    const token = getToken();
    const form = new FormData();
    form.append("jobId", jobId);
    if (notes != null) form.append("notes", notes);
    form.append("file", file);
    const res = await fetch(`${API_BASE}/applications`, {
      method: "POST",
      body: form,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || res.statusText);
    }
    return res.json();
  },
  async logout() {
    try {
      await request("/auth/logout", { method: "POST" });
    } catch (_) {}
    setToken(null);
  },
};