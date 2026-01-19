import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Eye, LayoutGrid, Instagram } from "lucide-react";

import { SOCIAL_MANUAL } from "../data/socialManual";
import KpiCard from "../components/KPICard";
import InfoGrid from "../components/InfoGrid";

export default function InstagramPage() {
  const [igActive, setIgActive] = useState("main");
  const ig = SOCIAL_MANUAL.instagram[igActive];

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
      <div className="glass header">
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">Instagram Dashboard</h2>
            <p className="subTitle">
              Last 6 Months • Total views:{" "}
              <span style={{ color: "#00ff66", fontWeight: 900 }}>
                {SOCIAL_MANUAL.instagram.summary.totalViews}
              </span>
            </p>
          </div>
        </div>

        <div className="tabs">
          <Link className="tabBtn" to="/">
            ⟵ Home
          </Link>

          <button className={`tabBtn ${igActive === "main" ? "tabBtnActive" : ""}`} onClick={() => setIgActive("main")}>
            GUESSS India
          </button>
          <button
            className={`tabBtn ${igActive === "podcast" ? "tabBtnActive" : ""}`}
            onClick={() => setIgActive("podcast")}
          >
            Podcast
          </button>
        </div>
      </div>

      <div className="grid">
        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<LayoutGrid size={22} />} label="Total Posts" value={ig.totalPosts} sub="Last 6 months" />
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<Users size={22} />} label="Total Followers" value={ig.totalFollowers} />
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<Eye size={22} />} label="Views" value={ig.totalViews} />
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <KpiCard icon={<Instagram size={22} />} label="Accounts Reached" value={ig.accountsReached} />
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <InfoGrid
            title="Visibility"
            items={[
              { label: "Views", value: ig.totalViews },
              { label: "Accounts Reached", value: ig.accountsReached },
            ]}
          />
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <InfoGrid
            title="Engagement"
            items={[
              { label: "Interactions", value: ig.interactions },
              { label: "Total Posts", value: ig.totalPosts },
            ]}
          />
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <div className="glass cardPad">
            <div className="sectionTitle">Audience Split</div>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={igAudienceChart}>
                  <XAxis dataKey="label" stroke="#cfcfcf" />
                  <YAxis stroke="#cfcfcf" />
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
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={igProfileChart}>
                  <XAxis dataKey="label" stroke="#cfcfcf" />
                  <YAxis stroke="#cfcfcf" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffd166" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
