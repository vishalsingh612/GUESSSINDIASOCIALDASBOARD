import React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";

import { SOCIAL_MANUAL } from "../data/socialManual";
import KpiCard from "../components/KPICard";
import EmailTable from "../components/EmailTable";

export default function EmailsPage() {
  return (
    <div className="container">
      <div className="glass header">
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">Emails Dashboard</h2>
            <p className="subTitle">
              Email Batches:{" "}
              <span style={{ color: "#00ff66", fontWeight: 900 }}>
                {SOCIAL_MANUAL.emails.emailBatches}
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
          <EmailTable title="E-MAILS (Campaign Summary)" rows={SOCIAL_MANUAL.emails.rows} total={SOCIAL_MANUAL.emails.total} />
        </div>
      </div>
    </div>
  );
}
