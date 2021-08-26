import "./app.css";
import jurimma_logo from "./jurimma_logo.png";
import jurimma_logo_hover from "./jurimma_logo_hover.png";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search"
import { useState } from "react"

function App() {
  // console.log(dummyData);
  const [logoHover, setLogoHover] = useState(false)
  return (
    <div id="wrap">
      <nav></nav>

      <div className="navBar">
        <header>
          <h1 id="jurimma" >
            <img src={jurimma_logo} alt="logo" />
          </h1>
        </header>
        <Search />
        <footer>
          copyright JURIMMA
        </footer>
      </div>
    </div>
  );
}

export default App;
