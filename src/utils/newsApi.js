import ArticleDates from "../utils/getDates";

export default class Api {
  constructor({ baseUrl, apiKey, searchQuery }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._searchQuery = searchQuery;
    this._articleDates = new ArticleDates();
    this._pageSize = 100;
  }

  getNewsArticles(query) {
    if (query) {
      return fetch(
        `${
          this._baseUrl
        }?q=${query}&from=${this._articleDates.getDateSevenDaysAgo()}&to=${this._articleDates.getTodaysDate()}&pageSize=${
          this._pageSize
        }&language=en&apiKey=${this._apiKey}`
      ).then((res) => this._checkReponse(res));
    } else {
      console.log("search query empty"); //TODO: handle this error properly
      return Promise.reject(`Error`);
    }
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
