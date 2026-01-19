import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube, Instagram, Linkedin, Mail, Sparkles } from "lucide-react";

import { YOUTUBE_MANUAL } from "../data/youtubeManual";
import { SOCIAL_MANUAL } from "../data/socialManual";
import { getInsightValue } from "../lib/youtubeCalculations";

function HomeIconCard({ title, icon, value, onClick }) {
  return (
    <div
      className="homeIconCard glass"
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
    >
      <div className="homeIcon">{icon}</div>

      <div className="homeCardTitle">{title}</div>

      <div className="homeCardMeta">Total Views</div>
      <div className="homeCardValue">{value}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const impressions = useMemo(() => {
    const podcast = YOUTUBE_MANUAL.podcast;
    return getInsightValue(podcast.insights, "Impressions");
  }, []);

  return (
    <div className="container">
      {/* ✅ TOP HERO AREA */}
      <div className="homeHero">
        <div className="homeHeroTitle">GUESSS India Social Dashboard</div>

        {/* ✅ Logo */}
        <div className="homeLogoWrap">
          <img
            src="/logo.png"
            alt="GUESSS India Logo"
            className="homeLogo"
            onError={(e) => {
              // fallback to CRA logo if logo.png missing
              e.currentTarget.src = "/logo192.png";
            }}
          />
        </div>

        {/* ✅ Total Impressions */}
        <div className="homeImpressionsLabel">Total Impressions</div>
        <div className="homeImpressionsValue">{impressions}</div>
      </div>

      {/* ✅ FLOW ARROWS + ICON TABS */}
      <div className="homeFlowWrap">
        {/* curved arrows */}
        <div className="homeArrows">
          <svg
            viewBox="0 0 1200 260"
            className="homeArrowSvg"
            preserveAspectRatio="none"
          >
            {/* Left */}
            <path
              d="M600 10 C 380 20, 270 80, 200 240"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Mid-left */}
            <path
              d="M600 10 C 460 40, 430 90, 430 240"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Center */}
            <path
              d="M600 10 C 600 60, 600 120, 600 240"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Mid-right */}
            <path
              d="M600 10 C 740 40, 770 90, 770 240"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right */}
            <path
              d="M600 10 C 820 20, 930 80, 1000 240"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ✅ Main Action Buttons Row */}
        <div className="homeNavPills glass">
          <button className="homePill active" onClick={() => navigate("/youtube")}>
            YouTube
          </button>
          <button className="homePill" onClick={() => navigate("/instagram")}>
            Instagram
          </button>
          <button className="homePill" onClick={() => navigate("/linkedin")}>
            LinkedIn
          </button>
          <button className="homePill" onClick={() => navigate("/emails")}>
            Emails
          </button>
          <button className="homePill" onClick={() => navigate("/initiatives")}>
            Initiatives
          </button>
        </div>

        {/* ✅ Icon Grid Cards */}
        <div className="homeCardsGrid">
          <HomeIconCard
            title="YouTube"
            icon={<Youtube size={32} />}
            value={YOUTUBE_MANUAL.podcast.views}
            onClick={() => navigate("/youtube")}
          />
          <HomeIconCard
            title="Instagram"
            icon={<Instagram size={32} />}
            value={SOCIAL_MANUAL.instagram.summary.totalViews}
            onClick={() => navigate("/instagram")}
          />
          <HomeIconCard
            title="LinkedIn"
            icon={<Linkedin size={32} />}
            value={SOCIAL_MANUAL.linkedin.totalImpressions}
            onClick={() => navigate("/linkedin")}
          />
          <HomeIconCard
            title="Emails"
            icon={<Mail size={32} />}
            value={SOCIAL_MANUAL.emails.total.sent}
            onClick={() => navigate("/emails")}
          />
          <HomeIconCard
            title="Initiatives"
            icon={<Sparkles size={32} />}
            value="Open"
            onClick={() => navigate("/initiatives")}
          />
        </div>
      </div>
    </div>
  );
}

