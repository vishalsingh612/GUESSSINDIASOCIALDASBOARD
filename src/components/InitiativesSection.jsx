import React from "react";
import { Sparkles, School, Handshake, GraduationCap, Users } from "lucide-react";

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

export default function InitiativesSection() {
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
    { label: "Partner", value: "nptel" },
  ];

  const guviCourses = [
    "8 hours of recorded content",
    "Personal branding & development for Entrepreneurs",
    "Built a chatbox using python",
    "How to build your own startup",
  ];

  return (
    <div className="grid">
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
                  <div style={{ color: "#bdbdbd", fontWeight: 800, fontSize: 12 }}>{x.label}</div>
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
