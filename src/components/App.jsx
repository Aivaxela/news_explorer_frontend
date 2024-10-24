import "../blocks/App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import Api from "../utils/api";
import NewsApi from "../utils/newsApi";
import { signin, signup } from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token.js";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import SavedNews from "./SavedNews";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

const api = new Api({ baseUrl: "http://localhost:3002" });
const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
  apiKey: "a16de474931b4e5a83f83ad53ba3df69",
});

export default function App() {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState({
    results: [],
    keyword: "",
    articlesAvail: 0,
    articlesShown: 3,
    loading: false,
    nothingFound: false,
  });
  const [userState, setUserState] = useState({
    authLoaded: false,
    loggedIn: false,
    username: "",
    savedNews: [],
  });
  const [activeModal, setActiveModal] = useState("");
  const [protectedDestination, setProtectedDestination] = useState("");

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

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setUserState((prevState) => ({
        ...prevState,
        authLoaded: true,
      }));
      return;
    }
    getUserArticles().then((articles) => {
      api
        .getUser(jwt)
        .then((userData) => {
          setUserState((prevState) => ({
            ...prevState,
            authLoaded: true,
            loggedIn: true,
            username: userData.username,
            email: userData.email,
            savedNews: articles,
          }));
        })
        .catch((err) => console.error(err));
    });
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchState((prevState) => ({
      ...prevState,
      loading: true,
      nothingFound: false,
      articlesShown: 3,
    }));
    newsApi
      .getNewsArticles(query)
      .then((res) => {
        setSearchState((prevState) => ({
          ...prevState,
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
        setSearchState((prevState) => ({ ...prevState, loading: false }))
      );
  };

  const getUserArticles = () => {
    const jwt = getToken();
    if (!jwt) return;

    return api.getArticles(jwt).then(({ data }) => {
      return data;
    });
  };

  const addSavedArticle = (newArticle) => {
    const jwt = getToken();
    if (!jwt) return;

    api
      .saveArticle(newArticle, jwt)
      .then((res) => {
        const updatedSavedNews = [...userState.savedNews, res];
        setUserState((prevState) => ({
          ...prevState,
          savedNews: updatedSavedNews,
        }));
      })
      .catch((err) => console.error(err));
  };

  const removeSavedArticle = (id) => {
    api
      .removeArticle(id)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          savedNews: [
            ...userState.savedNews.filter((article) => article.id != res.id),
          ],
        }));
      })
      .catch((err) => console.error(err));
  };

  const handleSignin = (values, resetForm) => {
    signin(values)
      .then((userData) => {
        setToken(userData.token);
        getUserArticles()
          .then((articles) => {
            setUserState((prevState) => ({
              ...prevState,
              loggedIn: true,
              username: userData.username,
              savedNews: articles,
            }));
            closeActiveModal();
            resetForm();
            navigate(protectedDestination || "/");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const handleSignup = (values, resetForm) => {
    signup(values)
      .then((userData) => {
        setToken(userData.token);
        setUserState((prevState) => ({
          ...prevState,
          loggedIn: true,
          username: userData.username,
        }));
        closeActiveModal();
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleSignout = () => {
    setUserState((prevState) => ({
      ...prevState,
      loggedIn: false,
      email: "",
      username: "",
      savedNews: [],
    }));
    navigate("/");
    removeToken();
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
