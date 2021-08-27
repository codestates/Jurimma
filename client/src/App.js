import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import { useState } from "react";
import Nav from "./comp/Nav";

function App() {
  // console.log(dummyData);
  const [logoHover, setLogoHover] = useState(false);
  return (
    <div id="wrap">
      <Nav />

      <div className="exNav">
        <header>
          <h1 id="jurimma"></h1>
        </header>
        <Search />
        <footer>copyright JURIMMA</footer>
      </div>
    </div>
  );
}

export default App;
