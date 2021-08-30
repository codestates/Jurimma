import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useState } from "react";
import Nav from "./comp/Nav";
import Modal from "./comp/Modal";
import LogoutModal from "./comp/logoutModal";
import Mypage from "./pages/Mypage";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import WriteModal from "./comp/WriteModal";
import MypageEdit from "./pages/MypageEdit";

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(true);
  const [searched, setSearched] = useState(true);
  const [onModal, setOnModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);
  const [closeLogoutModal, setCloseLogoutModal] = useState(false);

  return (
    <BrowserRouter>
      <div id="wrap">
        {onModal ? <Modal setOnModal={setOnModal} /> : null}
        {writeModal ? <WriteModal setWriteModal={setWriteModal} /> : null}
        {closeLogoutModal ? (
          <LogoutModal
            setCloseLogoutModal={setCloseLogoutModal}
            setisLogin={setisLogin}
          />
        ) : null}
        <Nav
          isLogin={isLogin}
          setOnModal={setOnModal}
          setisLogin={setisLogin}
          setCloseLogoutModal={setCloseLogoutModal}
        />

        <div className="exNav">
          <header>
            <Link to="/">
              <h1 id="jurimma"></h1>
            </Link>
          </header>

          <Switch>
            <>
              <Route exact path="/">
                <Search
                  setOnModal={setOnModal}
                  isLogin={isLogin}
                  data={dummyData.word}
                  setWriteModal={setWriteModal}
                  searched={searched}
                />
              </Route>
              <Route exact path="/searchMore">
                <SearchMore />
              </Route>
              <Route exact path="/mypage">
                <Mypage isLogin={isLogin} />
              </Route>
              <Route exact path="/mypageEdit">
                <MypageEdit isLogin={isLogin} />
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
