import React, { useMemo, useState } from "react";
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
  Legend,
} from "recharts";
import {
  Users,
  Eye,
  LayoutGrid,
  BarChart3,
  Mail,
  Linkedin,
  Instagram,
  Sparkles,
  School,
  Handshake,
  GraduationCap,
} from "lucide-react";

import { YOUTUBE_MANUAL } from "./data/youtubeManual";
import { SOCIAL_MANUAL } from "./data/socialManual";
import {
  calcContentTotal,
  calcTrafficSourceTotal,
  calcViewsPerSubscriber,
  getInsightValue,
} from "./lib/youtubeCalculations";

/* =========================================================
   UI Helpers (Your YouTube Dashboard - INTACT)
========================================================= */
function KpiCard({ icon, label, value, sub }) {
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
      <div>
        <div style={{ fontSize: 12, color: "#bdbdbd" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#00ff66" }}>{value}</div>
        {sub ? <div style={{ fontSize: 12, color: "#9a9a9a", marginTop: 2 }}>{sub}</div> : null}
      </div>
    </div>
  );
}

/* ✅ 1-line meaning under each insight */
function getInsightMeaning(label) {
  const map = {
    Impressions: "How many times your content was shown on YouTube.",
    "Views from impressions": "Views generated after people saw your impression.",
    "Watch time (Hours)": "Total time viewers spent watching your content.",
    "Average view duration (Hours)": "Average watch time per view (in hours).",
  };

  return map[label] || "";
}

function MiniTable({ title, rows }) {
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

/* ✅ FIXED Tooltip: show Source Name + % */
function TrafficSourceTooltip({ active, payload }) {
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

/* =========================================================
   NEW HELPERS for Instagram / LinkedIn / Emails (Same design)
========================================================= */
function InfoGrid({ title, items }) {
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

function EmailTable({ title, rows, total }) {
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

/* =========================================================
   INITIATIVES TAB SECTION ✅
========================================================= */
function TagList({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
      {items.map((t, idx) => (
        <div
          key={idx}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#ddd",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

function InitiativesSection() {
  const academicPartners = [
    "Symboisis Center for Entrepreneurship & innovation",
    "Amity Mohali",
    "Parul University",
    "LNMIIT",
    "NMIMS Hyderabad",
    "SSRM",
    "Khalsa College, Amritsar",
    "Guru Ghasidas Vishwavidyalay",
    "NIT Arunachal Pradesh Dean Student Welfare & chairman HMC/(Chief warden), Assiciate Professor, Mannagement & humanitaries",
  ];

  const partners = [
    { label: "Natinal Partner", value: "REVA University" },
    { label: "Technical Partner", value: "Upstack Media" },
    { label: "Upskiling Partner", value: "GUVI & HCL" },
    { label: "Creative Partner", value: "Akshar Creatives" },
    { label: "", value: "nptel" },
  ];

  const guviCourses = [
    "8 hours of recorded content",
    "Personal branding & development for Entrepreneurs",
    "Built a chatbox using python",
    "How to build your own startup",
  ];

  return (
    <div className="grid" style={{ marginTop: 16 }}>
      <div style={{ gridColumn: "span 12" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 1000, color: "#00ff66" }}>Initiatives</div>
              <div style={{ fontSize: 12, color: "#9a9a9a", fontWeight: 700 }}>
                Snapshot of key programs, partners & courses
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Immersion */}
      <div style={{ gridColumn: "span 4" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <School size={18} color="#00ff66" />
            <div className="sectionTitle" style={{ marginBottom: 0 }}>
              Campus Immersion Prog.
            </div>
          </div>

          <TagList
            items={[
              "Theme: 2 Venture Program",
              "Duration: 2 days",
              "Participants: 60",
              "Guest: Saurabh Mittal",
              "Location: IIT Mandi",
            ]}
          />
        </div>
      </div>

      {/* Campus Ambassadors */}
      <div style={{ gridColumn: "span 4" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <GraduationCap size={18} color="#00ff66" />
            <div className="sectionTitle" style={{ marginBottom: 0 }}>
              Campus Ambasadors
            </div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            {[
              { k: "Applications recieved", v: 1587 },
              { k: "Interviews taken", v: 1334 },
              { k: "active", v: 422 },
              { k: "highly active", v: 154 },
            ].map((x, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#bdbdbd", fontWeight: 700 }}>{x.k}</div>
                <div style={{ color: "#00ff66", fontWeight: 900 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Fellows */}
      <div style={{ gridColumn: "span 4" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Users size={18} color="#00ff66" />
            <div className="sectionTitle" style={{ marginBottom: 0 }}>
              Faculty Fellows
            </div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            {[
              { k: "Intrested", v: 106 },
              { k: "Selected", v: 25 },
            ].map((x, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#bdbdbd", fontWeight: 700 }}>{x.k}</div>
                <div style={{ color: "#00ff66", fontWeight: 900 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Partners */}
      <div style={{ gridColumn: "span 6" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <School size={18} color="#00ff66" />
            <div className="sectionTitle" style={{ marginBottom: 0 }}>
              Academic Partners
            </div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {academicPartners.map((p, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#ddd",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners + GUVI */}
      <div style={{ gridColumn: "span 6" }}>
        <div className="glass cardPad">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Handshake size={18} color="#00ff66" />
            <div className="sectionTitle" style={{ marginBottom: 0 }}>
              Partners & GUVI (Courses)
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ color: "#00ff66", fontWeight: 900, marginBottom: 8 }}>Partners</div>
            <div style={{ display: "grid", gap: 10 }}>
              {partners.map((x, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "#bdbdbd", fontWeight: 800, fontSize: 12 }}>
                    {x.label || "Partner"}
                  </div>
                  <div style={{ color: "#ddd", fontWeight: 900, fontSize: 13 }}>{x.value}</div>
                </div>
              ))}
            </div>

            <div style={{ color: "#00ff66", fontWeight: 900, marginTop: 16, marginBottom: 8 }}>
              GUVI (Courses)
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              {guviCourses.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#ddd",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP ✅ (with Initiatives tab)
========================================================= */
export default function App() {
  // ✅ MAIN TAB SWITCH
  const [tab, setTab] = useState("youtube"); // youtube | instagram | linkedin | emails | initiatives

  // YouTube switch
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
      viewsPerSubscriber: calcViewsPerSubscriber({ views: data.views, subscribers: data.subscribers }),
    };
  }, [data]);

  const CHART_COLORS = ["#00ff66", "#00c2ff", "#ffd166", "#ff5c5c", "#b35cff", "#ffffff"];

  const trafficTotalLabel =
    Math.abs(derived.trafficTotal - 100) < 0.2 ? "100%" : `${derived.trafficTotal.toFixed(1)}% (check data)`;

  // Instagram switch
  const [igActive, setIgActive] = useState("main");
  const ig = SOCIAL_MANUAL.instagram[igActive];

  // LinkedIn
  const liAccountEngagement = useMemo(() => {
    const e = SOCIAL_MANUAL.linkedin.account.socialEngagement;
    return [
      { label: "Reactions", value: e.reactions },
      { label: "Comments", value: e.comments },
      { label: "Reposts", value: e.reposts },
      { label: "Saves", value: e.saves },
      { label: "Media Shared", value: e.mediaShared },
      { label: "Link Visits", value: e.linkVisits },
    ];
  }, []);

  const liPageEngagement = useMemo(() => {
    const e = SOCIAL_MANUAL.linkedin.page.socialEngagement;
    return [
      { label: "Reactions", value: e.reactions },
      { label: "Comments", value: e.comments },
      { label: "Reposts", value: e.reposts },
    ];
  }, []);

  const liDiscovery = useMemo(() => {
    const acc = SOCIAL_MANUAL.linkedin.account.discovery;
    const page = SOCIAL_MANUAL.linkedin.page.discovery;

    return [
      { metric: "Impressions (Account)", value: acc.impressions },
      { metric: "Members Reached", value: acc.membersReached },
      { metric: "Profile Appearances", value: acc.profileAppearances },
      { metric: "Impressions (Page)", value: page.impressions },
      { metric: "Page Views", value: page.pageViews },
      { metric: "Unique Visitors", value: page.uniqueVisitors },
    ];
  }, []);

  const igAudienceChart = useMemo(() => {
    return [
      { label: "Followers", value: ig.followers },
      { label: "Non Followers", value: ig.nonFollowers },
    ];
  }, [ig]);

  const igProfileChart = useMemo(() => {
    return [
      {
        label: igActive === "main" ? "Profile Activity" : "Profile Visits",
        value: igActive === "main" ? ig.profileActivity : ig.profileVisits,
      },
      { label: "External Links", value: ig.externalLinks },
    ];
  }, [ig, igActive]);

  return (
    <div className="container">
      {/* Header */}
      <div className="glass header" style={{ marginTop: 16 }}>
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">GUESSS India Social Dashboard</h2>

            {tab === "youtube" ? (
              <p className="subTitle">
                Total Impressions:{" "}
                <span style={{ color: "#00ff66", fontWeight: 900 }}>{derived.impressions}</span>
              </p>
            ) : tab === "instagram" ? (
              <p className="subTitle">
                Last 6 Months • Total views:{" "}
                <span style={{ color: "#00ff66", fontWeight: 900 }}>
                  {SOCIAL_MANUAL.instagram.summary.totalViews}
                </span>
              </p>
            ) : tab === "linkedin" ? (
              <p className="subTitle">
                Total impressions:{" "}
                <span style={{ color: "#00ff66", fontWeight: 900 }}>
                  {SOCIAL_MANUAL.linkedin.totalImpressions}
                </span>
              </p>
            ) : tab === "emails" ? (
              <p className="subTitle">
                Email Batches:{" "}
                <span style={{ color: "#00ff66", fontWeight: 900 }}>
                  {SOCIAL_MANUAL.emails.emailBatches}
                </span>
              </p>
            ) : (
              <p className="subTitle">
                Initiatives: <span style={{ color: "#00ff66", fontWeight: 900 }}>Programs & Partners</span>
              </p>
            )}
          </div>
        </div>

        {/* ✅ MAIN DASHBOARD TABS (same row) */}
        <div className="tabs">
          <button className={`tabBtn ${tab === "youtube" ? "tabBtnActive" : ""}`} onClick={() => setTab("youtube")}>
            YouTube
          </button>
          <button
            className={`tabBtn ${tab === "instagram" ? "tabBtnActive" : ""}`}
            onClick={() => setTab("instagram")}
          >
            Instagram
          </button>
          <button
            className={`tabBtn ${tab === "linkedin" ? "tabBtnActive" : ""}`}
            onClick={() => setTab("linkedin")}
          >
            LinkedIn
          </button>
          <button className={`tabBtn ${tab === "emails" ? "tabBtnActive" : ""}`} onClick={() => setTab("emails")}>
            Emails
          </button>
          <button
            className={`tabBtn ${tab === "initiatives" ? "tabBtnActive" : ""}`}
            onClick={() => setTab("initiatives")}
          >
            Initiatives
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB: INITIATIVES ✅
      ========================================================= */}
      {tab === "initiatives" && <InitiativesSection />}

      {/* =========================================================
          TAB: YOUTUBE (INTACT)
      ========================================================= */}
      {tab === "youtube" && (
        <div className="grid">
          {/* Channel Switch */}
          <div style={{ gridColumn: "span 12" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Select YouTube Channel</div>
              <div className="tabs">
                <button
                  className={`tabBtn ${active === "main" ? "tabBtnActive" : ""}`}
                  onClick={() => setActive("main")}
                >
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
          </div>

          {/* KPIs */}
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

          {/* Left: Insights table */}
          <div style={{ gridColumn: "span 6" }}>
            <MiniTable title="Key Insights" rows={data.insights} />
          </div>

          {/* Right: Content Shared bar chart */}
          <div style={{ gridColumn: "span 6" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Content Shared Breakdown</div>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={data.contentShared}>
                    <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Tooltip
                      wrapperStyle={{ outline: "none" }}
                      contentStyle={{
                        background: "rgba(0,0,0,0.92)",
                        border: "1px solid rgba(0,255,102,0.55)",
                        borderRadius: 14,
                        padding: "10px 12px",
                        color: "#ffffff",
                        boxShadow: "0 0 18px rgba(0,255,102,0.18)",
                      }}
                      itemStyle={{ color: "#ffffff", fontWeight: 800 }}
                      labelStyle={{ color: "#00ff66", fontWeight: 900, marginBottom: 6 }}
                    />
                    <Bar dataKey="value" fill="#00ff66" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Traffic Source donut */}
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
      )}

      {/* =========================================================
          TAB: INSTAGRAM (VISUAL)
      ========================================================= */}
      {tab === "instagram" && (
        <div className="grid">
          <div style={{ gridColumn: "span 12" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Select Instagram Handle</div>
              <div className="tabs">
                <button
                  className={`tabBtn ${igActive === "main" ? "tabBtnActive" : ""}`}
                  onClick={() => setIgActive("main")}
                >
                  GUESSS India
                </button>
                <button
                  className={`tabBtn ${igActive === "podcast" ? "tabBtnActive" : ""}`}
                  onClick={() => setIgActive("podcast")}
                >
                  Podcast
                </button>
              </div>
              <div style={{ marginTop: 8, color: "#9a9a9a", fontSize: 12 }}>
                Easy view: Visibility → Engagement → Profile actions
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<LayoutGrid size={22} />} label="Total Posts" value={ig.totalPosts} sub="Last 6 months" />
          </div>
          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Users size={22} />} label="Total Followers" value={ig.totalFollowers} sub="Snapshot" />
          </div>
          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Eye size={22} />} label="Views" value={ig.totalViews} sub="Total views" />
          </div>
          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Instagram size={22} />} label="Accounts Reached" value={ig.accountsReached} sub="Reach" />
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <InfoGrid
              title="Visibility"
              items={[
                { label: "Views", value: ig.totalViews, hint: "Total views generated in last 6 months" },
                { label: "Accounts Reached", value: ig.accountsReached, hint: "Unique accounts reached" },
              ]}
            />
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <InfoGrid
              title="Engagement"
              items={[
                { label: "Interactions", value: ig.interactions, hint: "Total engagement actions" },
                { label: "Total Posts", value: ig.totalPosts, hint: "Content output" },
              ]}
            />
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Audience Split</div>
              <div style={{ color: "#9a9a9a", fontSize: 12, marginBottom: 8 }}>
                Followers vs Non-Followers distribution
              </div>

              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={igAudienceChart}>
                    <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00c2ff" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Profile Actions</div>
              <div style={{ color: "#9a9a9a", fontSize: 12, marginBottom: 8 }}>
                Visits/activity vs external links
              </div>

              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={igProfileChart}>
                    <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ffd166" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "span 12" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Instagram Combined Summary (Both Handles)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <div style={{ color: "#bdbdbd" }}>Total views:</div>
                <div style={{ color: "#00ff66", fontWeight: 900 }}>
                  {SOCIAL_MANUAL.instagram.summary.totalViews}
                </div>
                <div style={{ color: "#bdbdbd" }}>Accounts reached:</div>
                <div style={{ color: "#00ff66", fontWeight: 900 }}>
                  {SOCIAL_MANUAL.instagram.summary.accountsReached}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: LINKEDIN
      ========================================================= */}
      {tab === "linkedin" && (
        <div className="grid">
          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Linkedin size={22} />} label="Account Followers" value={SOCIAL_MANUAL.linkedin.account.followers} />
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Users size={22} />} label="Connections" value={SOCIAL_MANUAL.linkedin.account.connections} />
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Linkedin size={22} />} label="Page Followers" value={SOCIAL_MANUAL.linkedin.page.followers} />
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <KpiCard icon={<Eye size={22} />} label="Total Impressions" value={SOCIAL_MANUAL.linkedin.totalImpressions} />
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Engagement Breakdown (Account)</div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={liAccountEngagement}>
                    <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00ff66" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Engagement Breakdown (Page)</div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={liPageEngagement}>
                    <XAxis dataKey="label" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00c2ff" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "span 12" }}>
            <div className="glass cardPad">
              <div className="sectionTitle">Discovery (Reach & Visibility)</div>

              <div style={{ width: "100%", height: 340 }}>
                <ResponsiveContainer>
                  <BarChart data={liDiscovery}>
                    <XAxis dataKey="metric" stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#cfcfcf" tick={{ fontSize: 12 }} />
                    <Legend />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ffd166" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: EMAILS
      ========================================================= */}
      {tab === "emails" && (
        <div className="grid">
          <div style={{ gridColumn: "span 4" }}>
            <KpiCard icon={<Mail size={22} />} label="Total Sent" value={SOCIAL_MANUAL.emails.total.sent} />
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <KpiCard icon={<Mail size={22} />} label="Total Received" value={SOCIAL_MANUAL.emails.total.received} />
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <KpiCard icon={<Linkedin size={22} />} label="Email Batches" value={SOCIAL_MANUAL.emails.emailBatches} />
          </div>

          <div style={{ gridColumn: "span 12" }}>
            <EmailTable
              title="E-MAILS (Campaign Summary)"
              rows={SOCIAL_MANUAL.emails.rows}
              total={SOCIAL_MANUAL.emails.total}
            />
          </div>
        </div>
      )}
    </div>
  );
}
