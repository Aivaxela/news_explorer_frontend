export default class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getUser = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
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
    return fetch(`${this.baseUrl}/articles`, {
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

  saveArticle = (article, token) => {
    return fetch(`${this.baseUrl}/articles`, {
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

  removeArticle = (id) => {
    return new Promise((resolve) => {
      resolve({
        id: id,
      });
    });
  };
}
