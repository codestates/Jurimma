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
import axios from "axios";
import EditContentModal from "./comp/EditContentModal";

function App() {
  // console.log(dummyData);
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
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
  const [editResult, setEditResult] = useState({
    data: "",
  }); // 변경 필요한 값
  const [userContent, setUserContent] = useState({
    data: [],
  }); // 개인이 작성한 글 결과값
  const [needUpdate, setNeedUpdate] = useState(false); // 리렌더링 필요한지

  const [writeModal, setWriteModal] = useState(false);
  const [closeLogoutModal, setCloseLogoutModal] = useState(false);
  const [onSignoutModal, setOnSignoutModal] = useState(false);
  const [moreClickModal, setMoreClickModal] = useState(false);
  const [editContentModal, setEditContentModal] = useState(false);

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

  useEffect(async () => {
    await searchWord(searchValue);
    await searchUserWord();
  }, [needUpdate]);

  const searchWord = async (searchValue) => {
    let searchRes = await axios.post(`${url}/search`, {
      wordName: searchValue,
    });
    setResult(searchRes.data.data); // 결과값 업데이트
    setSearched(true);
  };

  const searchUserWord = async () => {
    let userContent = await axios.get(`${url}/myContents`, {
      header: { authorization: `Bearer ${accToken}` },
    });
    setUserContent({
      data: userContent.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  }; // 유저가 쓴 글 가져오기

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
            setNeedUpdate={setNeedUpdate}
            needUpdate={needUpdate}
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
          <SignoutModal
            setOnSignoutModal={setOnSignoutModal}
            setAccToken={setAccToken}
            setisLogin={setisLogin}
            accToken={accToken}
          />
        ) : null}

        {/* 단어 뜻 모달 */}
        {moreClickModal ? (
          <MoreClickModal
            setMoreClickModal={setMoreClickModal}
            currResult={currResult}
            setAccToken={setAccToken}
            accToken={accToken}
            setNeedUpdate={setNeedUpdate}
            needUpdate={needUpdate}
          />
        ) : null}

        {/*단어 뜻 수정 모달 */}
        {editContentModal ? (
          <EditContentModal
            setAccToken={setAccToken}
            accToken={accToken}
            setEditContentModal={setEditContentModal}
            editResult={editResult}
            needUpdate={needUpdate}
            setNeedUpdate={setNeedUpdate}
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
                  setCurrResult={setCurrResult}
                  setNeedUpdate={setNeedUpdate}
                  searchWord={searchWord}
                />
              </Route>
              <Route exact path="/searchMore">
                <SearchMore
                  result={result}
                  setMoreClickModal={setMoreClickModal}
                  setWriteModal={setWriteModal}
                  setCurrResult={setCurrResult}
                  setResult={setResult}
                />
              </Route>
              <Route exact path="/mypage">
                <Mypage
                  userContent={userContent}
                  searchUserWord={searchUserWord}
                  isLogin={isLogin}
                  accToken={accToken}
                  setMoreClickModal={setMoreClickModal}
                  setCurrResult={setCurrResult}
                  setEditContentModal={setEditContentModal}
                  setEditResult={setEditResult}
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
