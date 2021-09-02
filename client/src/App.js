import "./app.css";
import Search from "./pages/Search";
import SearchMore from "./pages/SearchMore";
import { useEffect, useState } from "react";
import Nav from "./comp/Nav";
import Modal from "./comp/Modal";
import LogoutModal from "./comp/logoutModal";
import Mypage from "./pages/Mypage";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import WriteModal from "./comp/WriteModal";
import MypageEdit from "./pages/MypageEdit";
import SignoutModal from "./comp/SignoutModal";
import MoreClickModal from "./comp/MoreClickModal";
import axios from "axios";
import EditContentModal from "./comp/EditContentModal";
require("dotenv").config();

axios.defaults.withCredentials = true;

function App() {
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

  // useEffect(async () => {
  //   console.log(process.env.KAKAO_KEY);
  //   Kakao.init(process.env.KAKAO_KEY);
  //   console.log(Kakao.isInitialized());
  //   setSearched(false);
  //   //   try {
  //   const url = new URL(window.location.href);
  //   const authorizationCode = url.searchParams.get("code");
  //   console.log("인증 코드 : ", authorizationCode);
  //     if (authorizationCode) {
  //       // authorization server로부터 클라이언트로 리디렉션된 경우, authorization code가 함께 전달됩니다.
  //       // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
  //       const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  //       const payload = {
  //         authorizationCode,
  //       };
  //       const loginResult = await axios.post(`${url}/user/kakao`, payload);
  //       console.log("loginResult : ", loginResult);
  //       await setUserInfo({
  //         id: loginResult.data.userInfo.id,
  //         username: loginResult.data.userInfo.username,
  //         email: loginResult.data.userInfo.email,
  //         userPic: loginResult.data.userInfo.userPic,
  //       });
  //       await setAccToken(loginResult.data.accessToken);
  //       localStorage.setItem("accessToken", loginResult.data.accessToken);
  //       localStorage.setItem(
  //         "userInfo",
  //         JSON.stringify({
  //           id: loginResult.data.userInfo.id,
  //           username: loginResult.data.userInfo.username,
  //           email: loginResult.data.userInfo.email,
  //           userPic: loginResult.data.userInfo.userPic,
  //         })
  //       );
  //       // history.push("/");
  //       setisLogin(true);
  //       setOnModal(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("로그인 정보가 없습니다.");
  //   }
  // }, []);

  useEffect(() => {
    if (!accToken) {
      setisLogin(false);
    } else {
      setisLogin(true);
    }
  }, [accToken]);

  useEffect(async () => {
    await searchWord(searchValue);
  }, [needUpdate]);

  const searchWord = async (searchValue) => {
    let searchRes = await axios.post(`${url}/search`, {
      wordName: searchValue,
    });
    setResult(searchRes.data.data); // 결과값 업데이트
    setSearched(true);
  };

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
          />
        ) : null}

        {/* 새글쓰기 모달 */}
        {writeModal ? (
          <WriteModal
            setWriteModal={setWriteModal}
            accToken={accToken}
            setAccToken={setAccToken}
            userInfo={userInfo}
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
            setSearched={setSearched}
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
            userContent={userContent}
            setAccToken={setAccToken}
            accToken={accToken}
            setEditContentModal={setEditContentModal}
            editResult={editResult}
            setUserContent={setUserContent}
          />
        ) : null}
        <Nav
          isLogin={isLogin}
          accToken={accToken}
          setAccToken={setAccToken}
          setUserContent={setUserContent}
          setOnModal={setOnModal}
          setCloseLogoutModal={setCloseLogoutModal}
          userInfo={userInfo}
        />

        <div className="exNav">
          <header>
            <Link to="/">
              <h1 id="jurimma"> </h1>
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
                  searchWord={searchWord}
                />
              </Route>
              <Route exact path="/searchMore">
                <SearchMore
                  result={result}
                  setMoreClickModal={setMoreClickModal}
                  setWriteModal={setWriteModal}
                  setCurrResult={setCurrResult}
                />
              </Route>
              <Route exact path="/mypage">
                <Mypage
                  userContent={userContent}
                  setUserContent={setUserContent}
                  setAccToken={setAccToken}
                  isLogin={isLogin}
                  accToken={accToken}
                  setMoreClickModal={setMoreClickModal}
                  setCurrResult={setCurrResult}
                  setEditResult={setEditResult}
                  setEditContentModal={setEditContentModal}
                />
              </Route>
              <Route exact path="/mypageEdit">
                <MypageEdit
                  isLogin={isLogin}
                  setOnSignoutModal={setOnSignoutModal}
                  userInfo={userInfo}
                  setCloseLogoutModal={setCloseLogoutModal}
                  accToken={accToken}
                  setAccToken={setAccToken}
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

// import "./app.css";
// import dummyData from "./dummy/dummyData";
// import Search from "./pages/Search";
// import SearchMore from "./pages/SearchMore";
// import { useEffect, useState } from "react";
// import Nav from "./comp/Nav";
// import Modal from "./comp/Modal";
// import LogoutModal from "./comp/logoutModal";
// import Mypage from "./pages/Mypage";
// import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
// import WriteModal from "./comp/WriteModal";
// import MypageEdit from "./pages/MypageEdit";
// import SignoutModal from "./comp/SignoutModal";
// import MoreClickModal from "./comp/MoreClickModal";

// function App() {
//   // console.log(dummyData);
//   const [isLogin, setisLogin] = useState(false); // 로그인 여부
//   const [userInfo, setUserInfo] = useState(
//     JSON.parse(localStorage.getItem("userInfo"))
//   );
//   const [accToken, setAccToken] = useState(localStorage.getItem("accessToken"));
//   const [searched, setSearched] = useState(false); // 검색한 적이 있는지 여부
//   const [onModal, setOnModal] = useState(false); // 로그인, 회원가입 모달 열 여부
//   const [searchValue, setSearchValue] = useState(""); // search input에 검색하려는 값
//   const [result, setResult] = useState([]); // search 결과값

//   const [writeModal, setWriteModal] = useState(false);
//   const [closeLogoutModal, setCloseLogoutModal] = useState(false);
//   const [onSignoutModal, setOnSignoutModal] = useState(false);
//   const [moreClickModal, setMoreClickModal] = useState(false);

//   useEffect(() => {
//     setSearched(false);
//   }, []);

//   useEffect(() => {
//     if (!accToken) {
//       setisLogin(false);
//     } else {
//       setisLogin(true);
//     }
//   }, [accToken]);

//   return (
//     <BrowserRouter>
//       <div id="wrap">
//         {/* 로그인 모달 */}
//         {onModal ? (
//           <Modal
//             setOnModal={setOnModal}
//             setisLogin={setisLogin}
//             setUserInfo={setUserInfo}
//             setAccToken={setAccToken}
//             accToken={accToken}
//           />
//         ) : null}

//         {/* 새글쓰기 모달 */}
//         {writeModal ? (
//           <WriteModal
//             setWriteModal={setWriteModal}
//             accToken={accToken}
//             setAccToken={setAccToken}
//             userInfo={userInfo}
//             isLogin={isLogin}
//           />
//         ) : null}

//         {/* 로그아웃 모달 */}
//         {closeLogoutModal ? (
//           <LogoutModal
//             setCloseLogoutModal={setCloseLogoutModal}
//             setisLogin={setisLogin}
//             accToken={accToken}
//             setAccToken={setAccToken}
//           />
//         ) : null}

//         {/* 회원탈퇴 모달 */}
//         {onSignoutModal ? (
//           <SignoutModal setOnSignoutModal={setOnSignoutModal} />
//         ) : null}

//         {/* 단어 뜻 모달 */}
//         {moreClickModal ? (
//           <MoreClickModal setMoreClickModal={setMoreClickModal} />
//         ) : null}

//         <Nav
//           isLogin={isLogin}
//           setOnModal={setOnModal}
//           setisLogin={setisLogin}
//           setCloseLogoutModal={setCloseLogoutModal}
//           userInfo={userInfo}
//         />

//         <div className="exNav">
//           <header>
//             <Link to="/">
//               <h1 id="jurimma"></h1>
//             </Link>
//           </header>

//           <Switch>
//             <>
//               <Route exact path="/">
//                 <Search
//                   setOnModal={setOnModal}
//                   isLogin={isLogin}
//                   data={dummyData.word}
//                   setWriteModal={setWriteModal}
//                   searched={searched}
//                   setSearched={setSearched}
//                   setMoreClickModal={setMoreClickModal}
//                   searchValue={searchValue}
//                   setSearchValue={setSearchValue}
//                   accToken={accToken}
//                   setAccToken={setAccToken}
//                   result={result}
//                   setResult={setResult}
//                 />
//               </Route>
//               <Route exact path="/searchMore">
//                 <SearchMore
//                   result={result}
//                   setMoreClickModal={setMoreClickModal}
//                   setWriteModal={setWriteModal}
//                 />
//               </Route>
//               <Route exact path="/mypage">
//                 <Mypage isLogin={isLogin} accToken={accToken} />
//               </Route>
//               <Route exact path="/mypageEdit">
//                 <MypageEdit
//                   isLogin={isLogin}
//                   setOnSignoutModal={setOnSignoutModal}
//                   setUserInfo={setUserInfo}
//                   userInfo={userInfo}
//                   accToken={accToken}
//                   setAccToken={setAccToken}
//                   setCloseLogoutModal={setCloseLogoutModal}
//                   setisLogin={setisLogin}
//                 />
//               </Route>
//               <footer>copyright JURIMMA</footer>
//             </>
//           </Switch>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
