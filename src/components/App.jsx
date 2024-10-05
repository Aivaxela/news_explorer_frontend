import "../blocks/App.css";
import React from "react";
import Preloader from "../components/Preloader";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import { Route, Routes, Navigate } from "react-router-dom";
import { articles } from "../utils/text-data";
import Api from "../utils/news-api";
import { currentDateLong, sevenDaysAgo } from "../utils/get-dates";

export default function App() {
  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything?",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  console.log(currentDateLong);
  console.log(sevenDaysAgo);

  //   api.getNewsArticles();

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
