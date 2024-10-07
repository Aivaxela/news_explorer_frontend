import "../blocks/App.css";
import React, { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import { Route, Routes, Navigate } from "react-router-dom";
import Api from "../utils/newsApi";
import { testData } from "../utils/testData";

export default function App() {
  const [resultsVisible, setResultsVisible] = useState(false); //TODO: set default to false
  const [resultsLoading, setResultsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsShown, setSearchResultsShown] = useState(3);
  const [searchResultsAvailable, setSearchResultsAvailable] = useState(0);
  const [showNothingFound, setShowNothingFound] = useState(false);

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  const handleSearchSubmit = (query) => {
    setResultsLoading(true);
    setShowNothingFound(false);
    api
      .getNewsArticles(query)
      .then((res) => {
        setResultsVisible(res.totalResults > 0 ? true : false);
        setSearchResultsAvailable(res.totalResults > 0 ? res.totalResults : 0);
        setSearchResults(res.totalResults > 0 ? res.articles : []);
        setShowNothingFound(res.totalResults <= 0 ? true : false);
      })
      .catch((err) => console.log(err)) //TODO: handle this error properly
      .finally(() => setResultsLoading(false));
  };

  const showMoreResults = () =>
    setSearchResultsShown(
      searchResultsAvailable > searchResultsShown
        ? searchResultsShown + 3
        : searchResultsShown
    );

  useEffect(() => {
    // setSearchResults(Array.from(testData.articles)); //TODO: TEST DATA
    // setSearchResultsAvailable(testData.totalResults); //TODO: TEST DATA
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                resultsVisible={resultsVisible}
                resultsLoading={resultsLoading}
                handleSearchSubmit={handleSearchSubmit}
                searchResults={searchResults}
                searchResultsShown={searchResultsShown}
                showMoreResults={showMoreResults}
                showNothingFound={showNothingFound}
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
