import React from "react";
import { Link } from "react-router-dom";

import InitiativesSection from "../components/InitiativesSection";

export default function InitiativesPage() {
  return (
    <div className="container">
      <div className="glass header">
        <div className="brand">
          <div className="brandDot" />
          <div>
            <h2 className="brandTitle">Initiatives</h2>
            <p className="subTitle">Campus Programs • Partners • Courses</p>
          </div>
        </div>

        <div className="tabs">
          <Link className="tabBtn" to="/">
            ⟵ Home
          </Link>
        </div>
      </div>

      <InitiativesSection />
    </div>
  );
}
