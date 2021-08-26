import "./app.css";
import jurimma_logo from "./jurimma_logo.png";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search"

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
        <Search />
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
