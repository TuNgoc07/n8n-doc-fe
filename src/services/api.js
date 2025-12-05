// Simple API client for frontend-only auth flow
const API_BASE = import.meta.env.VITE_API_URL || "https://api.n8n-group2.online";

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
  async login(email, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  async me() {
    return request("/auth/me", { method: "GET" });
  },
  async logout() {
    setToken(null);
  },
};