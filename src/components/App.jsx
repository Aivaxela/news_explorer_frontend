import "../blocks/App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchContext } from "../contexts/searchContext";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import Api from "../utils/newsApi";
import { testData } from "../utils/testData"; //TODO: TEST DATA - remove before deployment

export default function App() {
  const [searchState, setSearchState] = useState({
    results: [],
    articlesAvail: 0,
    articlesShown: 3,
    loading: false,
    nothingFound: false,
  });

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  const handleSearchSubmit = (query) => {
    setSearchState((state) => ({
      ...state,
      loading: true,
      nothingFound: false,
      articlesShown: 3,
    }));
    api
      .getNewsArticles(query)
      .then((res) => {
        setSearchState((state) => ({
          ...state,
          articlesAvail: res.totalResults,
          results: res.articles.filter(
            (article) => article.title !== "[Removed]"
          ),
          nothingFound: res.totalResults <= 0 ? true : false,
        }));
      })
      .catch((err) => console.log(err)) //TODO: handle this error properly
      .finally(() => setSearchState((state) => ({ ...state, loading: false })));
  };

  useEffect(() => {
    // setSearchResults(Array.from(testData.articles)); //TODO: TEST DATA
    // setSearchResultsAvailable(testData.totalResults); //TODO: TEST DATA
  }, []);

  const searchContext = {
    searchState,
    setSearchState,
  };

  return (
    <div className="page">
      <div className="page__content">
        <SearchContext.Provider value={searchContext}>
          <Routes>
            <Route
              path="/"
              element={<Main handleSearchSubmit={handleSearchSubmit}></Main>}
            />
            <Route path="/saved-news" element={<SavedNews></SavedNews>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </SearchContext.Provider>
      </div>
    </div>
  );
}
