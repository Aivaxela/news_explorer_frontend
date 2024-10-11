import "../blocks/App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
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
    email: "",
    password: "",
    username: "",
  });
  const [activeModal, setActiveModal] = useState("");

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  const searchContext = {
    searchState,
    setSearchState,
  };

  const userContext = {
    userState,
    setUserState,
  };

  const appContext = {
    activeModal,
    setActiveModal,
  };

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

  function listenForEsc() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setActiveModal("");
    });
  }
  listenForEsc();

  // useEffect(() => {
  //   //TODO: TEST DATA - remove before deployment
  //   setSearchState((currState) => ({
  //     ...currState,
  //     results: Array.from(TEST_DATA.articles),
  //     articlesAvail: TEST_DATA.totalResults,
  //     loading: false,
  //   }));
  // }, []);

  return (
    <div className="page">
      <div className="page__content">
        <SearchContext.Provider value={searchContext}>
          <UserContext.Provider value={userContext}>
            <AppContext.Provider value={appContext}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main handleSearchSubmit={handleSearchSubmit}></Main>
                  }
                />
                <Route path="/saved-news" element={<SavedNews></SavedNews>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
              <SigninModal
                isVisible={activeModal === "signin" ? true : false}
              />
            </AppContext.Provider>
          </UserContext.Provider>
        </SearchContext.Provider>
      </div>
    </div>
  );
}
