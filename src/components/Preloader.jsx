import "../blocks/Preloader.css";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function Preloader() {
  const { searchState } = useContext(SearchContext);
  return (
    <div
      className={`circle-preloader ${
        !searchState.loading ? "circle-preloader_hidden" : ""
      }`}
    ></div>
  );
}
