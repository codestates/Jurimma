import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useState } from "react";
import Nav from "./comp/Nav";

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(true);
  const [searched, setSearched] = useState(true)
  
  return (
    <div id="wrap">
      <Nav isLogin={isLogin}/>

      <div className="exNav">
        <header>
          <h1 id="jurimma"></h1>
        </header>
        {isLogin===true && searched===true ?
          <SearchMore data={dummyData.word} />
        :
          <Search data={dummyData.word}/>
        }
        <footer>copyright JURIMMA</footer>
      </div>
    </div>
  );
}

export default App;
