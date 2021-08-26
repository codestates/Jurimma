import "./app.css";
import jurimma_logo from "./jurimma_logo.png";
import dummyData from "./dummy/dummyData";

function App() {
  console.log(dummyData);

  return (
    <div id="wrap">
      <nav></nav>

      <div className="navBar">
        <header>
          <h1 id="jurimma">
            <img src={jurimma_logo} alt="logo" />
          </h1>
        </header>
        <section></section>
        <article></article>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
