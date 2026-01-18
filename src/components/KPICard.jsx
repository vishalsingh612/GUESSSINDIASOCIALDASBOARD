import React from "react";

export default function KpiCard({ icon, label, value, subValue }) {
  return (
    <div className="glass cardPad" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,255,90,0.12)",
          border: "1px solid rgba(0,255,90,0.22)",
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "#bdbdbd" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#00ff66" }}>{value}</div>
        {subValue ? (
          <div style={{ fontSize: 12, color: "#9a9a9a", marginTop: 2 }}>{subValue}</div>
        ) : null}
      </div>
    </div>
  );
}
