import "../blocks/App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SavedNews from "../components/SavedNews";
import SigninModal from "../components/SigninModal";
import Api from "../utils/newsApi";
import { TEST_DATA } from "../utils/testData"; //TODO: TEST DATA - remove before deployment

export default function App() {
  const [searchState, setSearchState] = useState({
    results: [],
    articlesAvail: 0,
    articlesShown: 3,
    loading: false,
    nothingFound: false,
  });
  const [userState, setUserState] = useState({
    loggedIn: false,
    username: "Riley",
  });

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  const handleSearchSubmit = (query) => {
    setSearchState((currState) => ({
      ...currState,
      loading: true,
      nothingFound: false,
      articlesShown: 3,
    }));
    api
      .getNewsArticles(query)
      .then((res) => {
        setSearchState((currState) => ({
          ...currState,
          articlesAvail: res.totalResults,
          results: res.articles.filter(
            (article) => article.title !== "[Removed]"
          ),
          nothingFound: res.totalResults <= 0 ? true : false,
        }));
      })
      .catch((err) => console.log(err)) //TODO: handle this error properly
      .finally(() =>
        setSearchState((currState) => ({ ...currState, loading: false }))
      );
  };

  // useEffect(() => {
  //   //TODO: TEST DATA - remove before deployment
  //   setSearchState((currState) => ({
  //     ...currState,
  //     results: Array.from(TEST_DATA.articles),
  //     articlesAvail: TEST_DATA.totalResults,
  //     loading: false,
  //   }));
  // }, []);

  const searchContext = {
    searchState,
    setSearchState,
  };

  const userContext = {
    userState,
    setUserState,
  };

  return (
    <div className="page">
      <div className="page__content">
        <SearchContext.Provider value={searchContext}>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleSearchSubmit={handleSearchSubmit}
                  userContext={userContext}
                ></Main>
              }
            />
            <Route path="/saved-news" element={<SavedNews></SavedNews>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <SigninModal />
        </SearchContext.Provider>
      </div>
    </div>
  );
}
