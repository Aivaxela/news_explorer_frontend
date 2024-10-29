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
      }).then((res) => this._checkResponse(res));
    }
  }

  getUser = (token) => {
    return fetch(`${this._baseUrl}/users/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  };

  getArticles = (token) => {
    return fetch(`${this._baseUrl}/articles/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  };

  saveArticle = (article, token) => {
    return fetch(`${this._baseUrl}/articles/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    }).then((res) => this._checkResponse(res));
  };

  removeArticle = (articleId, token) => {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res
      .json()
      .then((err) => {
        return Promise.reject(`Error: ${res.status} - ${err.message}`);
      })
      .catch((err) => alert(err));
  }
}
