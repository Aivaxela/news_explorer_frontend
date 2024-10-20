export default class Api {
  addArticle = (article) => {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      resolve({
        id: id,
      });
    });
  };
}
