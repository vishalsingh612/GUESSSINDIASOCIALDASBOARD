import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Linkedin, Users, Eye } from "lucide-react";

import { SOCIAL_MANUAL } from "../data/socialManual";
import KpiCard from "../components/KPICard";

export default function LinkedinPage() {
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

  return (
    <div className="container">
      <div className="glass header">
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">LinkedIn Dashboard</h2>
            <p className="subTitle">
              Total impressions:{" "}
              <span style={{ color: "#00ff66", fontWeight: 900 }}>
                {SOCIAL_MANUAL.linkedin.totalImpressions}
              </span>
            </p>
          </div>
        </div>

        <div className="tabs">
          <Link className="tabBtn" to="/">
            ⟵ Home
          </Link>
        </div>
      </div>

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
                  <XAxis dataKey="label" stroke="#cfcfcf" />
                  <YAxis stroke="#cfcfcf" />
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
                  <XAxis dataKey="label" stroke="#cfcfcf" />
                  <YAxis stroke="#cfcfcf" />
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
                  <XAxis dataKey="metric" stroke="#cfcfcf" />
                  <YAxis stroke="#cfcfcf" />
                  <Legend />
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
