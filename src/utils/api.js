export default class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  //TODO: use JWT to log user in on page return:

  // getUser = (token) => {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  addArticle = (article) => {
    return new Promise((resolve) => {
      resolve({
        urlToImage: article.urlToImage,
        title: article.title,
        description: article.description,
        source: article.source,
        publishedAt: article.publishedAt,
        url: article.url,
        keyword: article.keyword,
        id: article.id,
      });
    });
  };

  removeArticle = (id) => {
    return new Promise((resolve) => {
      resolve({
        id: id,
      });
    });
  };
}
