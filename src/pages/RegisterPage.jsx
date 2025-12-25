import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function RegisterPage({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <form onSubmit={handleSubmit} style={{ width: 400, background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: 8, textAlign: "center", fontSize: "1.75rem", fontWeight: 700, color: "#1e293b" }}>Đăng ký tài khoản</h2>
        <p style={{ textAlign: "center", marginBottom: 24, color: "#64748b" }}>Tham gia hệ thống tuyển dụng</p>
        
        {error && (
          <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px", borderRadius: 8, marginBottom: 20, fontSize: "0.875rem", border: "1px solid #fee2e2" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="fullName" style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 500, color: "#475569" }}>Họ và tên</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nguyễn Văn A"
            required
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: "1rem", transition: "all 0.2s" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 500, color: "#475569" }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: "1rem", transition: "all 0.2s" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 500, color: "#475569" }}>Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: "1rem", transition: "all 0.2s" }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 500, color: "#475569" }}>Xác nhận mật khẩu</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: "1rem", transition: "all 0.2s" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "12px", 
            borderRadius: 8, 
            border: "none", 
            background: loading ? "#94a3b8" : "#2563eb", 
            color: "white", 
            fontWeight: 600, 
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? "Đang xử lý..." : "Đăng ký ngay"}
        </button>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={{ color: "#2563eb", fontWeight: 600, border: "none", background: "none", cursor: "pointer" }}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}
