import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useState } from "react";
import Nav from "./comp/Nav";
import Modal from "./comp/Modal";
import Mypage from "./pages/Mypage";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(true);
  const [searched, setSearched] = useState(false);
  const [onModal, setOnModal] = useState(false);

  return (
    <BrowserRouter>
      <div id="wrap">
        {onModal ? <Modal /> : null}
        <Nav isLogin={isLogin} />
        <header>
          <Link to="/">
            <h1 id="jurimma"></h1>
          </Link>
        </header>

        <Switch>
          <div className="exNav">
            <Route exact path="/mypage">
              <Mypage />
            </Route>
            <Route exact path="/">
              {isLogin === true && searched === true ? (
                <SearchMore data={dummyData.word} />
              ) : (
                <Search data={dummyData.word} />
              )}
            </Route>
            <footer>copyright JURIMMA</footer>
          </div>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
