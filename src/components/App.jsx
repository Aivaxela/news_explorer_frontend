import "../blocks/App.css";
import React from "react";
import Preloader from "../components/Preloader";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import { Route, Routes, Navigate } from "react-router-dom";
import { articles } from "../utils/text-data";

export default function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/saved-news" element={<SavedNews></SavedNews>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
