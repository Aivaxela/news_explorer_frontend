import "../blocks/App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import Api from "../utils/api";
import { signin, signup } from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token.js";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import SavedNews from "./SavedNews";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.yournewsexplorer.crabdance.com"
    : "http://localhost:3002";
const api = new Api({ baseUrl });

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
        .catch((err) => alert(err));
    });
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchState((prevState) => ({
      ...prevState,
      loading: true,
      nothingFound: false,
      articlesShown: 3,
    }));
    api
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
      .catch((err) => alert(err))
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
      .then(({ data }) => {
        const updatedSavedNews = [...userState.savedNews, data];
        setUserState((prevState) => ({
          ...prevState,
          savedNews: updatedSavedNews,
        }));
      })
      .catch((err) => alert(err));
  };

  const removeSavedArticle = (id) => {
    const jwt = getToken();
    if (!jwt) return;

    api
      .removeArticle(id, jwt)
      .then(({ data }) => {
        setUserState((prevState) => ({
          ...prevState,
          savedNews: prevState.savedNews.filter(
            (article) => article._id != data._id
          ),
        }));
      })
      .catch((err) => alert(err));
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
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
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
      .catch((err) => alert(err));
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
