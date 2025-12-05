import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: 16, textAlign: "center" }}>Đăng nhập</h2>
        {error && (
          <div style={{ background: "#ffecec", color: "#d8000c", padding: "8px 12px", borderRadius: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@examplehehe.com"
          required
          style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 16, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "#3b82f6", color: "white", fontWeight: 600 }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
