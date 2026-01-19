import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { Users, Eye, LayoutGrid, BarChart3 } from "lucide-react";

import { YOUTUBE_MANUAL } from "../data/youtubeManual";
import {
  calcContentTotal,
  calcTrafficSourceTotal,
  calcViewsPerSubscriber,
  getInsightValue,
} from "../lib/youtubeCalculations";

import KpiCard from "../components/KPICard";
import MiniTable from "../components/MiniTable";
import TrafficSourceTooltip from "../components/tooltips/TrafficSourceTooltip";

export default function YoutubePage() {
  const [active, setActive] = useState("main");
  const data = YOUTUBE_MANUAL[active];

  const derived = useMemo(() => {
    const impressions = getInsightValue(data.insights, "Impressions");
    const contentTotal = calcContentTotal(data.contentShared);
    const trafficTotal = calcTrafficSourceTotal(data.trafficSource);

    return {
      impressions,
      contentTotal,
      trafficTotal,
      viewsPerSubscriber: calcViewsPerSubscriber({
        views: data.views,
        subscribers: data.subscribers,
      }),
    };
  }, [data]);

  const CHART_COLORS = ["#00ff66", "#00c2ff", "#ffd166", "#ff5c5c", "#b35cff", "#ffffff"];

  const trafficTotalLabel =
    Math.abs(derived.trafficTotal - 100) < 0.2
      ? "100%"
      : `${derived.trafficTotal.toFixed(1)}% (check data)`;

  return (
    <div className="container">
      {/* Header */}
      <div className="glass header">
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">YouTube Dashboard</h2>
            <p className="subTitle">
              Total Impressions:{" "}
              <span style={{ color: "#00ff66", fontWeight: 900 }}>{derived.impressions}</span>
            </p>
          </div>
        </div>

        <div className="tabs">
          <Link className="tabBtn" to="/">
            ⟵ Home
          </Link>
          <button className={`tabBtn ${active === "main" ? "tabBtnActive" : ""}`} onClick={() => setActive("main")}>
            GUESSS India
          </button>
          <button
            className={`tabBtn ${active === "podcast" ? "tabBtnActive" : ""}`}
            onClick={() => setActive("podcast")}
          >
            Podcast
          </button>
        </div>
      </div>

      <div className="grid">
        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<Users size={22} />} label="Subscribers" value={data.subscribers} />
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<Eye size={22} />} label="Total Views" value={data.views} />
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <KpiCard
            icon={<LayoutGrid size={22} />}
            label="Content Shared (Total)"
            value={derived.contentTotal}
            sub="Videos + Shorts + Posts + more"
          />
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <KpiCard
            icon={<BarChart3 size={22} />}
            label="Views / Subscriber"
            value={derived.viewsPerSubscriber.toFixed(2)}
            sub="Efficiency indicator"
          />
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <MiniTable title="Key Insights" rows={data.insights} />
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <div className="glass cardPad">
            <div className="sectionTitle">Content Shared Breakdown</div>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={data.contentShared}>
                  <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00ff66" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ gridColumn: "span 12" }}>
          <div className="glass cardPad">
            <div className="sectionTitle">
              Traffic Source Distribution{" "}
              <span style={{ color: "#9a9a9a", fontSize: 12, fontWeight: 600 }}>
                (Total ≈ {trafficTotalLabel})
              </span>
            </div>

            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.trafficSource}
                    dataKey="value"
                    nameKey="label"
                    outerRadius={120}
                    innerRadius={60}
                  >
                    {data.trafficSource.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<TrafficSourceTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 6, color: "#9a9a9a", fontSize: 12 }}>
              Hover on slices to see source + %.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
