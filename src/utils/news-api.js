export default class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;

    this._searchTerm = "";
  }

  getNewsArticles() {
    return fetch(
      `${this._baseUrl}q=${this._searchTerm}&apiKey=${this._apiKey}&from=2024-09-15&to=2024-10-03&pageSize=4`
    );
  }
}
