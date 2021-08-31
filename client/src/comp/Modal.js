import React, { useState } from "react";
import styled from "styled-components";
import logo from "../jurimma_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import { KAKAO_AUTH_URL } from "./oauth";
const { Kakao } = window;

const checkModule = require("../checkModule");
axios.defaults.withCredentials = true;

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  width: max(30vw, 350px);
  height: max(40vw, 600px);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 30px;
  min-width: 300px;
  text-align: center;
  position: relative;
  justify-items: center;
`;

const BoxOne = styled.div`
  width: 100%;
  height: 35%;
`;

const BoxTwo = styled.div`
  width: 100%;
  height: 65%;
`;

const WelcomeBox = styled.div`
  flex: 0.5 1 auto;
  > img {
    width: 5vw;
    height: 5vw;
    min-width: 80px;
    min-height: 80px;
  }
  > div {
    font-size: max(30px, 2.8vw);
    position: absolute;
    top: 20px;
    right: max(2.2vw, 20px);
    cursor: pointer;
    transition: 0.4s;
  }
  > div:hover {
    transform: rotate(180deg);
  }
  > h2 {
    // font-size 꼭 찾아보기
    font-size: max(20px, 1.8vw);
  }
  > p {
    font-size: max(12px, 0.8vw);
    padding: max(10px, 1.3vw);
  }
`;

const KakaoLogin = styled.button`
  width: 80%;
  height: 2.5vw;
  min-height: 35px;
  background-color: #fee500;
  margin: 0 auto;
  border-radius: 20px;
  border: 2px solid black;
  font-size: max(14px, 1vw);
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  > p {
    display: inline-block;
  }
  > #socialLogin {
    width: 1.2vw;
    height: 1.2vw;
    min-width: 18px;
    min-height: 18px;
    margin-right: 20px;
  }
  :hover {
    background-color: black;
    color: white;
  }
`;

const TabMenu = styled.ul`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  min-height: 40px;
  > .submenu {
    height: 100%;
    line-height: 50px;
    font-size: max(12px, 0.9vw);
    flex: 1 0 auto;
    text-align: center;
  }
  > .submenu:nth-child(2) {
    border-right: 0;
  }
  > li {
    cursor: pointer;
  }
  > .focused {
    color: black;
    border-bottom: 2px solid black;
  }
`;

const KakaoWrap = styled.div`
  flex: 1 1 auto;
`;

const TabWrap = styled.div`
  /* 없애면 안 됨 */
`;

const LoginBox = styled.div`
  width: 100%;
  height: 100%;
  > button {
    width: 60%;
    height: max(3vw, 40px);
    background-color: black;
    color: white;
    border: 2px solid black;
    border-radius: 50px;
    margin-top: 50px;
    transition: 0.3s;
  }
  > button:hover {
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    color: black;
  }
  > #inputBox {
    margin-top: max(4vw, 50px);
    > .inputWrap {
      width: 100%;
      height: max(3.3vw, 45px);
      margin-top: 20px;
      > input {
        width: 60%;
        height: max(3vw, 40px);
        outline: none;
        border: none;
        border-bottom: 2px solid black;
        padding-left: max(3vw, 50px);
        font-size: max(0.7vw, 12px);
      }
      > input:focus::-webkit-input-placeholder {
        color: transparent;
      }
      > input:hover::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        font-size: 15px;
        transition: 0.3s;
      }
      > .email {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881472816908759090/6590522_email_envelope_letter_mail_message_icon.png");
        background-size: max(1.5vw, 18px);
        background-repeat: no-repeat;
        background-position: 0.5vw;
      }
      > .password {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881480107225669642/4857866_key_lock_password_protection_secure_icon.png");
        background-position: 0.3vw;
        background-size: max(2vw, 22px);
        background-repeat: no-repeat;
      }
    }
  }
`;

const SignupBox = styled.div`
  width: 100%;
  height: 100%;
  > button {
    width: 60%;
    height: max(3vw, 40px);
    background-color: black;
    color: white;
    border: 2px solid black;
    border-radius: 50px;
    margin-top: 12px;
    transition: 0.3s;
  }
  > button:hover {
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    color: black;
  }
  > #inputBox {
    margin-top: max(1.5vw, 20px);
    > .inputWrap {
      width: 100%;
      height: max(3.3vw, 45px);
      margin-top: 2px;
      > input {
        width: 60%;
        height: max(3vw, 40px);
        outline: none;
        border: none;
        border-bottom: 2px solid black;
        padding-left: max(3vw, 50px);
        font-size: max(0.7vw, 12px);
      }
      > input:focus::-webkit-input-placeholder {
        color: transparent;
      }
      > input:hover::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        font-size: 15px;
        transition: 0.3s;
      }
      > #user {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881472814257942528/2561496_user_icon.png");
        background-size: max(1.5vw, 18px);
        background-repeat: no-repeat;
        background-position: 0.5vw;
      }
      > .email {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881472816908759090/6590522_email_envelope_letter_mail_message_icon.png");
        background-size: max(1.5vw, 18px);
        background-repeat: no-repeat;
        background-position: 0.5vw;
      }
      > #phone {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881472810017513492/2561306_phone_call_icon.png");
        background-size: max(1.5vw, 18px);
        background-repeat: no-repeat;
        background-position: 0.5vw;
      }
      > .password {
        background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881480107225669642/4857866_key_lock_password_protection_secure_icon.png");
        background-position: 0.3vw;
        background-size: max(2vw, 22px);
        background-repeat: no-repeat;
      }
    }
  }
`;

function Modal({ setOnModal, setisLogin, setUserInfo, setAccToken, accToken }) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(0);
  const [loginInfo, setLoginInfo] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [signupInfo, setSignupInfo] = useState({
    signupUsername: "",
    signupEmail: "",
    signupPhone: "",
    signupPassword: "",
    signupRePassword: "",
  });

  const handleKeyPressLogin = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleLogin();
    }
  };
  const handleKeyPressSignup = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSignup();
    }
  };

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleSignupInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      if (!loginInfo.loginEmail || !loginInfo.loginPassword) {
        alert("이메일과 비밀번호 모두 입력해주세요.");
      } else if (checkModule.IsValidateEmail(loginInfo.loginEmail) === false) {
        alert("유효하지 않은 이메일 입니다.");
      } else if (
        checkModule.IsValidatePassword(loginInfo.loginPassword) === false
      ) {
        alert("유효하지 않은 비밀번호 입니다.");
      } else {
        let loginResult = await axios.post(`${url}/user/login`, {
          email: loginInfo.loginEmail,
          password: loginInfo.loginPassword,
        });
        console.log(loginResult.data); // {accerssToken, userInfo,...}
        await setUserInfo({
          id: loginResult.data.userInfo.id,
          username: loginResult.data.userInfo.username,
          email: loginResult.data.userInfo.email,
          userPic: loginResult.data.userInfo.userPic,
        });
        await setAccToken(loginResult.data.accessToken);
        localStorage.setItem("accessToken", loginResult.data.accessToken);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: loginResult.data.userInfo.id,
            username: loginResult.data.userInfo.username,
            email: loginResult.data.userInfo.email,
            userPic: loginResult.data.userInfo.userPic,
          })
        );
        // history.push("/");
        setisLogin(true);
        setOnModal(false);
      }
    } catch (error) {
      console.log(error);
      alert("로그인 정보가 없습니다.");
    }
  };

  const handleSignup = async () => {
    try {
      if (
        !signupInfo.signupUsername ||
        !signupInfo.signupEmail ||
        !signupInfo.signupPhone ||
        !signupInfo.signupPassword ||
        !signupInfo.signupRePassword
      ) {
        alert("정보를 모두 입력해주세요.");
      } else if (signupInfo.signupPassword !== signupInfo.signupRePassword) {
        alert("비밀번호를 확인해주세요.");
      } else if (
        checkModule.IsValidateEmail(signupInfo.signupEmail) === false
      ) {
        alert("유효하지 않은 이메일 입니다.");
      } else if (
        checkModule.IsValidatePassword(signupInfo.signupPassword) === false
      ) {
        alert("유효하지 않은 비밀번호 입니다.");
      } else if (checkModule.OnlyNumber(signupInfo.signupPhone) === false) {
        alert("유효하지 않은 핸드폰 번호입니다.");
      } else if (checkModule.OnlyKorEng(signupInfo.signupUsername) === false) {
        alert("유효하지 않은 이름입니다.");
      } else {
        let signupResult = await axios.post(`${url}/user/signup`, {
          email: signupInfo.signupEmail,
          password: signupInfo.signupPassword,
          username: signupInfo.signupUsername,
          phone: signupInfo.signupPhone,
        });
        console.log(signupResult.data.message); // {message:"~~"}
        history.push("/");
        setOnModal(false);
        alert("회원가입이 완료되었습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("이미 가입된 사용자입니다.");
    }
  };
  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };
  // const kakaoLoginHandler = () => {
  //   const code = new URL(window.location.href).searchParams.get("code");
  //   console.log(code);
  // };
  // const kakaoLoginHandler = async () => {
  //   await loginWithKakao();
  // };

  // const loginWithKakao = async () => {
  //   const loginRes = await Kakao.Auth.login({
  //     success: async function (authObj) {
  //       // alert(JSON.stringify(authObj));
  //       let res = await axios({
  //         url: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1e2b4e1cf49e438a572407555898e7b1&redirect_uri=http://localhost:3000/oauth",
  //         method: "post",
  //         accept: "application/json",
  //         data: JSON.stringify({ access_token: authObj.access_token }),
  //       });
  //       await localStorage.setItem("Kakao_token", res.access_token);
  //       if (res.access_token) {
  //         setOnModal(false);
  //         setisLogin(true);
  //         history.push("/");
  //       }
  //     },
  //     fail: function (err) {
  //       alert(JSON.stringify(err));
  //     },
  //   });
  //   console.log(loginRes);
  // };

  // // // 아래는 데모를 위한 UI 코드입니다.
  // displayToken();
  // function displayToken() {
  //   const token = getCookie("authorize-access-token");
  //   if (token) {
  //     Kakao.Auth.setAccessToken(token);
  //     Kakao.Auth.getStatusInfo(({ status }) => {
  //       if (status === "connected") {
  //         document.getElementById("token-result").innerText =
  //           "login success. token: " + Kakao.Auth.getAccessToken();
  //       } else {
  //         Kakao.Auth.setAccessToken(null);
  //       }
  //     });
  //   }
  // }
  // function getCookie(name) {
  //   const value = "; " + document.cookie;
  //   const parts = value.split("; " + name + "=");
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // }
  // const KaKaoLogin = styled(KakaoLogin)``;
  return (
    <>
      <ModalBack>
        <ModalBox>
          <BoxOne>
            <WelcomeBox>
              <img src={logo} alt="logo" />
              <div onClick={() => setOnModal(false)}>&times;</div>
              <h2>만.반.잘.부!</h2>
              <p>만나서 반가워 잘 부탁해!</p>
            </WelcomeBox>

            <KakaoWrap>
              <KaKaoLogin
                jsKey="1e2b4e1cf49e438a572407555898e7b1"
                onSuccess={(res) => console.log(res)}
                onFailure={(res) => console.log(res)}
                getProfile={true}
                onLogout={console.info}
                style={{
                  width: "100%",
                }}
              >
                <KakaoLogin>
                  <FontAwesomeIcon icon={faComment} id="socialLogin" />
                  <p>카카오 로그인</p>
                </KakaoLogin>
              </KaKaoLogin>
            </KakaoWrap>
          </BoxOne>

          <BoxTwo>
            <TabWrap>
              <TabMenu>
                <li
                  className={currentTab === 0 ? "submenu focused" : "submenu"}
                  onClick={() => selectMenuHandler(0)}
                >
                  로그인
                </li>
                <li
                  className={currentTab === 1 ? "submenu focused" : "submenu"}
                  onClick={() => selectMenuHandler(1)}
                >
                  회원가입
                </li>
              </TabMenu>

              {currentTab === 0 ? (
                <LoginBox>
                  {" "}
                  {/* 로그인창 */}
                  <div id="inputBox">
                    <div className="inputWrap">
                      {/* <label htmlFor="email">이메일</label> */}
                      <input
                        className="email"
                        type="text"
                        placeholder="이메일"
                        onChange={handleInputValue("loginEmail")}
                        onKeyPress={handleKeyPressLogin}
                        value={loginInfo.loginEmail}
                      />
                    </div>
                    <div className="inputWrap">
                      {/* <label htmlFor="password">비밀번호</label> */}
                      <input
                        className="password"
                        type="password"
                        placeholder="비밀번호"
                        value={loginInfo.loginPassword}
                        onKeyPress={handleKeyPressLogin}
                        onChange={handleInputValue("loginPassword")}
                      />
                    </div>
                  </div>
                  <button onClick={handleLogin}>로그인 하기</button>
                </LoginBox>
              ) : (
                <SignupBox>
                  {" "}
                  {/* 회원가입 창 */}
                  <div id="inputBox">
                    <div className="inputWrap">
                      {/* <label htmlFor="user">사용자 이름</label> */}
                      <input
                        id="user"
                        type="text"
                        placeholder="사용자 이름 (한글과 영문만 가능)"
                        value={signupInfo.signupUsername}
                        onChange={handleSignupInputValue("signupUsername")}
                        onKeyPress={handleKeyPressSignup}
                      />
                    </div>
                    <div className="inputWrap">
                      {/* <label htmlFor="email">이메일</label> */}
                      <input
                        className="email"
                        type="text"
                        placeholder="이메일"
                        value={signupInfo.signupEmail}
                        onChange={handleSignupInputValue("signupEmail")}
                        onKeyPress={handleKeyPressSignup}
                      />
                    </div>
                    <div className="inputWrap">
                      {/* <label htmlFor="phone">핸드폰 번호</label> */}
                      <input
                        id="phone"
                        type="text"
                        placeholder="핸드폰 번호 (-)제외"
                        value={signupInfo.signupPhone}
                        onChange={handleSignupInputValue("signupPhone")}
                        onKeyPress={handleKeyPressSignup}
                      />
                    </div>
                    <div className="inputWrap">
                      {/* <label htmlFor="password">비밀번호</label> */}
                      <input
                        className="password"
                        type="password"
                        placeholder="비밀번호 (최소 8자이상, 대문자, 특수문자 포함)"
                        value={signupInfo.signupPassword}
                        onChange={handleSignupInputValue("signupPassword")}
                        onKeyPress={handleKeyPressSignup}
                      />
                    </div>
                    <div className="inputWrap">
                      {/* <label htmlFor="repassword">비밀번호 확인</label> */}
                      <input
                        className="password"
                        type="password"
                        placeholder="비밀번호 확인"
                        value={signupInfo.signupRePassword}
                        onChange={handleSignupInputValue("signupRePassword")}
                        onKeyPress={handleKeyPressSignup}
                      />
                    </div>
                  </div>
                  <button onClick={handleSignup}>가입하기</button>
                </SignupBox>
              )}
            </TabWrap>
          </BoxTwo>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default Modal;
