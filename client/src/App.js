import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useState } from "react";
import Nav from "./comp/Nav";
import Modal from "./comp/Modal";
import Mypage from "./pages/Mypage";
import MypageEdit from "./pages/MypageEdit";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import WriteModal from "./comp/WriteModal";

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(true);
  const [searched, setSearched] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);
  
  return (
    <BrowserRouter>
      <div id="wrap">
        {onModal ? <Modal /> : null}
        {writeModal ? <WriteModal /> : null}
        <Nav isLogin={isLogin} />
          
      <div className="exNav">
        <header>
          <Link to="/">
            <h1 id="jurimma"></h1>
          </Link>
        </header>

        <Switch>
          <>
            <Route path="/mypage">
              <Mypage />
            </Route>
            <Route path="/mypageEdit">
              <MypageEdit />
            </Route>
            <Route exact path="/">
              {isLogin === true && searched === true ? (
                <SearchMore data={dummyData.word} />
              ) : (
                <Search data={dummyData.word} />
              )}
            </Route>
            <footer>copyright JURIMMA</footer>
          </>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

