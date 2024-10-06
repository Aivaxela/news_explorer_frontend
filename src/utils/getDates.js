export default class ArticleDates {
  getTodaysDate() {
    return new Date().toLocaleString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  getDateSevenDaysAgo() {
    const currentDate = new Date();

    return new Date(
      currentDate.setDate(currentDate.getDate() - 7)
    ).toISOString();
  }
}
