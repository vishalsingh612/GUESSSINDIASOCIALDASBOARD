import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import YoutubePage from "./pages/YoutubePage";
import InstagramPage from "./pages/InstagramPage";
import LinkedinPage from "./pages/LinkedinPage";
import EmailsPage from "./pages/EmailsPage";
import InitiativesPage from "./pages/InitiativesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/youtube" element={<YoutubePage />} />
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/linkedin" element={<LinkedinPage />} />
      <Route path="/emails" element={<EmailsPage />} />
      <Route path="/initiatives" element={<InitiativesPage />} />
    </Routes>
  );
}
