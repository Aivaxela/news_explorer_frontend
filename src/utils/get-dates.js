const currentDate = new Date();

//date that prints on article cards
export const currentDateLong = currentDate.toLocaleString("default", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

//date 7 days ago for API fetch
export const sevenDaysAgo = new Date(
  currentDate.setDate(currentDate.getDate() - 7)
).toISOString();
