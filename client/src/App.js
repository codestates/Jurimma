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
import SignoutModal from "./comp/SignoutModal";

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(true);
  const [searched, setSearched] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);
  const [closeLogoutModal, setCloseLogoutModal] = useState(false);
  const [onSignoutModal, setOnSignoutModal] = useState(false);

  return (
    <BrowserRouter>
      <div id="wrap">
        {/* 로그인 모달 */}
        {onModal ? <Modal setOnModal={setOnModal} /> : null}

        {/* 새글쓰기 모달 */}
        {writeModal ? <WriteModal setWriteModal={setWriteModal} /> : null}

        {/* 로그아웃 모달 */}
        {closeLogoutModal ? (
          <LogoutModal
            setCloseLogoutModal={setCloseLogoutModal}
            setisLogin={setisLogin}
          />
        ) : null}

        {/* 회원탈퇴 모달 */}
        {onSignoutModal ? (
          <SignoutModal setOnSignoutModal={setOnSignoutModal} />
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
            <Link to="/searchMore"></Link>
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
                <MypageEdit
                  isLogin={isLogin}
                  setOnSignoutModal={setOnSignoutModal}
                />
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
