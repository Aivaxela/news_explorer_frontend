import "../blocks/Main.css";
import Nav from "../components/Nav";

export default function Main() {
  return (
    <>
      <main className="main">
        <Nav />
        <h1 className="main__title">What's going on in the world?</h1>
      </main>
    </>
  );
}
