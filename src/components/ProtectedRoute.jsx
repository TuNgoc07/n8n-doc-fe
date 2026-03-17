import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children, requireRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
        <div className="flex items-center gap-3 text-white/40">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Đang tải...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRoles) {
    const roles = Array.isArray(user.roles) ? user.roles : [];
    const hasRole = requireRoles.some((r) => roles.includes(r));
    if (!hasRole) return <Navigate to="/apply" replace />;
  }

  return children;
}
