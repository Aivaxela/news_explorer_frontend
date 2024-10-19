import "../blocks/SavedNews.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NewsCardList from "./NewsCardList";

export default function SavedNews() {
  const { userState } = useContext(UserContext);

  const keywords = userState.savedNews
    .map((article) => article.keyword)
    .reduce(
      (uniques, current) =>
        uniques.includes(current) ? uniques : uniques.push(current) && uniques,
      []
    );
  const { length: keywordsLength } = keywords;
  const [firstKeyword, secondKeyword] = keywords;

  return (
    <>
      <section className="saved">
        <p className="saved__subheader">Saved articles</p>
        <h1 className="saved__header">
          {userState.username}, you have {userState.savedNews.length} saved
          article
          <span>{userState.savedNews.length === 1 ? "" : "s"}</span>
        </h1>
        <p className="saved__keywords">
          By keywords:{" "}
          <span className="saved__keywords-bold">
            {keywordsLength > 2
              ? `${firstKeyword}, ${secondKeyword}, and ${
                  keywordsLength - 2
                } other${keywordsLength > 3 ? "s" : ""}`
              : keywordsLength === 2
              ? `${firstKeyword} and ${secondKeyword}`
              : keywordsLength === 1
              ? firstKeyword
              : "No keywords yet"}
          </span>
        </p>
      </section>
      <NewsCardList />
    </>
  );
}
