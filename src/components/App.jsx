import "../blocks/App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import Api from "../utils/newsApi";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import SavedNews from "./SavedNews";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

export default function App() {
  const [searchState, setSearchState] = useState({
    results: [],
    keyword: "",
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
    savedNews: [],
    savedKeywords: [],
  });
  const [activeModal, setActiveModal] = useState("");
  const [protectedDestination, setProtectedDestination] = useState("");
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    apiKey: "a16de474931b4e5a83f83ad53ba3df69",
  });

  useEffect(() => {
    if (protectedDestination !== "") setActiveModal("signin");
  }, [protectedDestination]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeActiveModal();
    });

    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target.classList[0] === "modal") closeActiveModal();
      });
    });
  }, []);

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
          keyword: query,
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

  const handleSignin = (values) => {
    setUserState({
      ...userState,
      loggedIn: true,
      username: values.email.split("@")[0], //TODO: replace w username retrieved from DB
      email: values.email,
      password: values.password,
    });
    navigate(protectedDestination || "/");
    closeActiveModal();
  };

  const handleSignup = (values) => {
    setUserState({
      loggedIn: true,
      username: values.username,
      email: values.email.split("@")[0], //TODO: replace w username retrieved from DB
      password: values.password,
    });
    closeActiveModal();
  };

  const handleSignout = () => {
    setUserState({
      loggedIn: false,
      email: "",
      password: "",
      username: "",
      savedNews: [],
      savedKeywords: [],
    });
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setProtectedDestination("");
  };

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
    closeActiveModal,
  };

  return (
    <div className="page">
      <div className="page__content">
        <SearchContext.Provider value={searchContext}>
          <UserContext.Provider value={userContext}>
            <AppContext.Provider value={appContext}>
              <Nav handleSignout={handleSignout} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main handleSearchSubmit={handleSearchSubmit}></Main>
                  }
                />
                <Route
                  path="/saved-news"
                  element={
                    <ProtectedRoute
                      setProtectedDestination={setProtectedDestination}
                    >
                      <SavedNews />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
              <SigninModal
                handleSignin={handleSignin}
                isVisible={activeModal === "signin" ? true : false}
              />
              <SignupModal
                handleSignup={handleSignup}
                isVisible={activeModal === "signup" ? true : false}
              />
            </AppContext.Provider>
          </UserContext.Provider>
        </SearchContext.Provider>
      </div>
    </div>
  );
}
