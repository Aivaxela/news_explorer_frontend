import "../blocks/SavedNews.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NewsCardList from "./NewsCardList";

export default function SavedNews() {
  const { userState } = useContext(UserContext);

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
            Nature, Yellowstone, and 2 others
          </span>
        </p>
      </section>
      <NewsCardList />
    </>
  );
}
