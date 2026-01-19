import React from "react";

export default function EmailTable({ title, rows, total }) {
  return (
    <div className="glass cardPad">
      <div className="sectionTitle">{title}</div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
          <thead>
            <tr style={{ color: "#00ff66", textAlign: "left" }}>
              <th style={{ padding: 10 }}>Group</th>
              <th style={{ padding: 10 }}>Mails Sent</th>
              <th style={{ padding: 10 }}>Received</th>
              <th style={{ padding: 10 }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={{ padding: 10, color: "#ddd", fontWeight: 700 }}>{r.group}</td>
                <td style={{ padding: 10, color: "#fff" }}>{r.sent}</td>
                <td style={{ padding: 10, color: "#fff" }}>{r.received}</td>
                <td style={{ padding: 10, color: "#bdbdbd" }}>{r.date}</td>
              </tr>
            ))}

            <tr style={{ borderTop: "1px solid rgba(0,255,102,0.25)" }}>
              <td style={{ padding: 10, color: "#00ff66", fontWeight: 900 }}>Total</td>
              <td style={{ padding: 10, color: "#00ff66", fontWeight: 900 }}>{total.sent}</td>
              <td style={{ padding: 10, color: "#00ff66", fontWeight: 900 }}>{total.received}</td>
              <td style={{ padding: 10, color: "#9a9a9a" }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
