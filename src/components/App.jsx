import "../blocks/App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import Api from "../utils/api";
import NewsApi from "../utils/newsApi";
import { authorize } from "../utils/auth";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import SavedNews from "./SavedNews";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

const api = new Api();
const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
  apiKey: "a16de474931b4e5a83f83ad53ba3df69",
});

api.getUser().then((res) => console.log(res));

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
    username: "",
    savedNews: [],
  });
  const [activeModal, setActiveModal] = useState("");
  const [protectedDestination, setProtectedDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (protectedDestination !== "") setActiveModal("signin");
  }, [protectedDestination]);

  useEffect(() => {
    if (!activeModal) return;

    const handleCloseOnEsc = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    document.addEventListener("keydown", handleCloseOnEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseOnEsc);
    };
  }, [activeModal]);

  const handleSearchSubmit = (query) => {
    setSearchState((currState) => ({
      ...currState,
      loading: true,
      nothingFound: false,
      articlesShown: 3,
    }));
    newsApi
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
      .catch((err) => console.error(err))
      .finally(() =>
        setSearchState((currState) => ({ ...currState, loading: false }))
      );
  };

  const addSavedArticle = (newArticle) => {
    api
      .addArticle(newArticle)
      .then((res) => {
        const updatedSavedNews = [...userState.savedNews, res];
        setUserState({
          ...userState,
          savedNews: updatedSavedNews,
        });
      })
      .catch((err) => console.error(err));
  };

  const removeSavedArticle = (id) => {
    api
      .removeArticle(id)
      .then((res) => {
        setUserState({
          ...userState,
          savedNews: [
            ...userState.savedNews.filter((article) => article.id != res.id),
          ],
        });
      })
      .catch((err) => console.error(err));
  };

  const handleSignin = (values, resetForm) => {
    authorize(values)
      .then((res) => {
        setUserState({
          ...userState,
          loggedIn: true,
          username: res.username,
          email: res.email,
        });
        closeActiveModal();
        resetForm();
        navigate(protectedDestination || "/");
      })
      .catch((err) => console.error(err));
  };

  const handleSignup = (values) => {
    authorize(values)
      .then((res) => {
        setUserState({
          ...userState,
          loggedIn: true,
          username: res.username,
          email: res.email,
        });
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleSignout = () => {
    setUserState({
      loggedIn: false,
      email: "",
      username: "",
      savedNews: [],
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
    addSavedArticle,
    removeSavedArticle,
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
