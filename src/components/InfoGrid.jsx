import React from "react";

export default function InfoGrid({ title, items }) {
  return (
    <div className="glass cardPad">
      <div className="sectionTitle">{title}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((x, idx) => (
          <div
            key={idx}
            style={{
              padding: 12,
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ color: "#bdbdbd", fontSize: 12 }}>{x.label}</div>
            <div style={{ color: "#00ff66", fontSize: 18, fontWeight: 900, marginTop: 4 }}>
              {x.value}
            </div>
            {x.hint ? (
              <div style={{ color: "#9a9a9a", fontSize: 12, marginTop: 6, lineHeight: 1.3 }}>
                {x.hint}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
