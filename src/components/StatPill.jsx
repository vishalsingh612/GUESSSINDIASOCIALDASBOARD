import React from "react";

export default function StatPill({ label, value }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 14,
        background: "rgba(0,255,90,0.10)",
        border: "1px solid rgba(0,255,90,0.22)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minWidth: 120,
      }}
    >
      <div style={{ fontSize: 12, color: "#bdbdbd" }}>{label}</div>
      <div style={{ fontWeight: 900, fontSize: 16, color: "#00ff66" }}>{value}</div>
    </div>
  );
}
