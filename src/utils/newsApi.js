import ArticleDates from "../utils/getDates";

export default class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._articleDates = new ArticleDates();
    this._pageSize = 100;
  }

  async getNewsArticles(query) {
    if (query) {
      try {
        const res = await fetch(
          `${
            this._baseUrl
          }?q=${query}&from=${this._articleDates.getDateSevenDaysAgo()}&to=${this._articleDates.getTodaysDate()}&pageSize=${
            this._pageSize
          }&language=en&apiKey=${this._apiKey}`
        );
        return this._checkReponse(res);
      } catch (error) {
        console.log("api fetching error");
      }
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
