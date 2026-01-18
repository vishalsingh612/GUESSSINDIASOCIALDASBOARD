import React from "react";
import StatPill from "./StatPill";
import { formatCompactNumber } from "../lib/format";

export default function ChannelCard({ channel }) {
  return (
    <div className="glass cardPad">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <img
          src={channel.thumbnail}
          alt={channel.title}
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            border: "1px solid rgba(0,255,90,0.25)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{channel.title}</div>
          <div style={{ fontSize: 12, color: "#bdbdbd" }}>Realtime public stats (YouTube Data API)</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <StatPill label="Subscribers" value={formatCompactNumber(channel.subscribers)} />
        <StatPill label="Total Views" value={formatCompactNumber(channel.views)} />
        <StatPill label="Total Videos" value={formatCompactNumber(channel.videos)} />
      </div>
    </div>
  );
}
