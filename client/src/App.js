import "./app.css";
import dummyData from "./dummy/dummyData";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useEffect, useState } from "react";
import Nav from "./comp/Nav";
import Modal from "./comp/Modal";
import LogoutModal from "./comp/logoutModal";
import Mypage from "./pages/Mypage";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import WriteModal from "./comp/WriteModal";
import MypageEdit from "./pages/MypageEdit";
import SignoutModal from "./comp/SignoutModal";
import MoreClickModal from "./comp/MoreClickModal";

function App() {
  // console.log(dummyData);
  const [isLogin, setisLogin] = useState(false); // 로그인 여부
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [accToken, setAccToken] = useState(localStorage.getItem("accessToken"));
  const [searched, setSearched] = useState(false); // 검색한 적이 있는지 여부
  const [onModal, setOnModal] = useState(false); // 로그인, 회원가입 모달 열 여부
  const [searchValue, setSearchValue] = useState(""); // search input에 검색하려는 값
  const [result, setResult] = useState([]); // search 결과값
  const [currResult, setCurrResult] = useState({
    data: "",
  }); // 눌러서 볼 search값
  console.log(currResult);
  const [writeModal, setWriteModal] = useState(false);
  const [closeLogoutModal, setCloseLogoutModal] = useState(false);
  const [onSignoutModal, setOnSignoutModal] = useState(false);
  const [moreClickModal, setMoreClickModal] = useState(false);

  useEffect(() => {
    setSearched(false);
  }, []);

  useEffect(() => {
    if (!accToken) {
      setisLogin(false);
    } else {
      setisLogin(true);
    }
  }, [accToken]);

  return (
    <BrowserRouter>
      <div id="wrap">
        {/* 로그인 모달 */}
        {onModal ? (
          <Modal
            setOnModal={setOnModal}
            setisLogin={setisLogin}
            setUserInfo={setUserInfo}
            setAccToken={setAccToken}
            accToken={accToken}
          />
        ) : null}

        {/* 새글쓰기 모달 */}
        {writeModal ? (
          <WriteModal
            setWriteModal={setWriteModal}
            accToken={accToken}
            setAccToken={setAccToken}
            userInfo={userInfo}
            isLogin={isLogin}
          />
        ) : null}

        {/* 로그아웃 모달 */}
        {closeLogoutModal ? (
          <LogoutModal
            setCloseLogoutModal={setCloseLogoutModal}
            setisLogin={setisLogin}
            accToken={accToken}
            setAccToken={setAccToken}
          />
        ) : null}

        {/* 회원탈퇴 모달 */}
        {onSignoutModal ? (
          <SignoutModal setOnSignoutModal={setOnSignoutModal} />
        ) : null}

        {/* 단어 뜻 모달 */}
        {moreClickModal ? (
          <MoreClickModal
            setMoreClickModal={setMoreClickModal}
            currResult={currResult}
          />
        ) : null}

        <Nav
          isLogin={isLogin}
          setOnModal={setOnModal}
          setisLogin={setisLogin}
          setCloseLogoutModal={setCloseLogoutModal}
          userInfo={userInfo}
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
                  setSearched={setSearched}
                  setMoreClickModal={setMoreClickModal}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  accToken={accToken}
                  setAccToken={setAccToken}
                  result={result}
                  setResult={setResult}
                />
              </Route>
              <Route exact path="/searchMore">
                <SearchMore
                  result={result}
                  setMoreClickModal={setMoreClickModal}
                  setWriteModal={setWriteModal}
                />
              </Route>
              <Route exact path="/mypage">
                <Mypage
                  isLogin={isLogin}
                  accToken={accToken}
                  setMoreClickModal={setMoreClickModal}
                  setCurrResult={setCurrResult}
                />
              </Route>
              <Route exact path="/mypageEdit">
                <MypageEdit
                  isLogin={isLogin}
                  setOnSignoutModal={setOnSignoutModal}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  accToken={accToken}
                  setAccToken={setAccToken}
                  setCloseLogoutModal={setCloseLogoutModal}
                  setisLogin={setisLogin}
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
