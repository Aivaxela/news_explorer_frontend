import "../blocks/App.css";
import React, { useState } from "react";
import Preloader from "../components/Preloader";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import { Route, Routes, Navigate } from "react-router-dom";
import Api from "../utils/newsApi";
import { testData } from "../utils/testData";

export default function App() {
  const [resultsVisible, setResultsVisible] = useState(true); //TODO: set default to false
  const [searchQuery, setSearchQuery] = useState("");

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
    searchQuery: searchQuery,
  });

  const handleSearchSubmit = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                resultsVisible={resultsVisible}
                handleSearchSubmit={handleSearchSubmit}
              ></Main>
            }
          />
          <Route path="/saved-news" element={<SavedNews></SavedNews>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
