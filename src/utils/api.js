import ArticleDates from "../utils/getDates";

export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._articleDates = new ArticleDates();
    this._pageSize = 100;
  }

  getNewsArticles(query) {
    if (query) {
      return this._request(`${this._baseUrl}/articles/search/${query}`, {
        method: "GET",
      });
    }
  }

  getUser(token) {
    return this._request(`${this._baseUrl}/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getArticles(token) {
    return this._request(`${this._baseUrl}/articles/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  saveArticle(article, token) {
    return this._request(`${this._baseUrl}/articles/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });
  }

  removeArticle(articleId, token) {
    return this._request(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _request(url, options) {
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return fetch(url, options).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((err) => {
      return Promise.reject(`Error: ${res.status} - ${err.message}`);
    });
  }
}
