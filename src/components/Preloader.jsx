import "../blocks/Preloader.css";

export default function Preloader({ resultsLoading }) {
  return (
    <div
      className={`circle-preloader ${
        !resultsLoading ? "circle-preloader_hidden" : ""
      }`}
    ></div>
  );
}
