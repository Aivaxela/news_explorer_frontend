import ArticleDates from "../utils/getDates";

export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._articleDates = new ArticleDates();
    this._pageSize = 100;
  }

  getNewsArticles(query) {
    if (query) {
      return fetch(`${this._baseUrl}/articles/search/${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => console.error(err));
    }
  }

  getUser = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  };

  getArticles = (token) => {
    return fetch(`${this._baseUrl}/articles/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log("here"));
  };

  saveArticle = (article, token) => {
    return fetch(`${this._baseUrl}/articles/me`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  };

  removeArticle = (articleId, token) => {
    return fetch(`${this._baseUrl}/articles/me/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  };

  _checkReponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res
      .json()
      .then((err) => {
        return Promise.reject(`Error: ${res.status} - ${err.message}`);
      })
      .catch((err) => console.error(err));
  }
}
