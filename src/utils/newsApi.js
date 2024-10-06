import ArticleDates from "../utils/getDates";

export default class Api {
  constructor({ baseUrl, apiKey, searchQuery }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._searchQuery = searchQuery;
    this._articleDates = new ArticleDates();

    this._pageSize = 6;
  }

  getNewsArticles() {
    return fetch(
      `${this._baseUrl}?q=${
        this._searchQuery
      }&from=${this._articleDates.getDateSevenDaysAgo()}&to=${this._articleDates.getTodaysDate()}&pageSize=${
        this._pageSize
      }&apiKey=${this._apiKey}`
    ).then((res) => this._checkReponse(res));
  }

  _checkReponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((err) => {
      return Promise.reject(`Error: ${res.status} - ${err.message}`);
    });
  }
}
