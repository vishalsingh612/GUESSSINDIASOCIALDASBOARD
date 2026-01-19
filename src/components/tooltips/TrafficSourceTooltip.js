import React from "react";

export default function TrafficSourceTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const sourceName = payload?.[0]?.payload?.label;
  const sourceValue = payload?.[0]?.value;

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.92)",
        border: "1px solid rgba(0,255,102,0.55)",
        borderRadius: 14,
        padding: "10px 12px",
        color: "#ffffff",
        boxShadow: "0 0 18px rgba(0,255,102,0.18)",
        fontWeight: 900,
        fontSize: 13,
        minWidth: 180,
      }}
    >
      <div style={{ color: "#00ff66", fontWeight: 900, marginBottom: 4 }}>{sourceName}</div>
      <div style={{ color: "#ffffff", fontWeight: 800 }}>{sourceValue}%</div>
    </div>
  );
}
