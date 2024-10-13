import { useContext } from "react";
import Nav from "./Nav";
import { UserContext } from "../contexts/UserContext";

export default function SavedNews() {
  const { userState } = useContext(UserContext);

  return (
    <>
      <Nav />
      <div className="saved">
        <p className="saved__subheader">Saved articles</p>
        <h1 className="saved__header">
          {userState.username}, you have 5 saved articles
        </h1>
        <p className="saved__keywords">
          By keywords:{" "}
          <span className="saved__keywords_bold">
            Nature, Yellowstone, and 2 others
          </span>
        </p>
      </div>
    </>
  );
}
