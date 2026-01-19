import React from "react";

function getInsightMeaning(label) {
  const map = {
    Impressions: "How many times your content was shown on YouTube.",
    "Views from impressions": "Views generated after people saw your impression.",
    "Watch time (Hours)": "Total time viewers spent watching your content.",
    "Average view duration (Hours)": "Average watch time per view (in hours).",
  };
  return map[label] || "";
}

export default function MiniTable({ title, rows }) {
  return (
    <div className="glass cardPad">
      <div className="sectionTitle">{title}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, idx) => (
          <div
            key={idx}
            style={{
              padding: "12px 12px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ color: "#ddd", fontWeight: 900 }}>{r.label}</div>
              <div style={{ color: "#00ff66", fontWeight: 900 }}>{r.value}</div>
            </div>

            <div style={{ marginTop: 6, fontSize: 12, color: "#9a9a9a", lineHeight: 1.35 }}>
              {getInsightMeaning(r.label)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
