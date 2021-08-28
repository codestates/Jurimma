import React, { useState } from "react";
import styled from "styled-components";
import logo from "../jurimma_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faComment } from "@fortawesome/free-solid-svg-icons";

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
  width: 30vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 30px;
  min-width: 300px;
  min-height: 500px;
  text-align: center;
  position: relative;
  justify-items: center;
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
    padding: 10px;
  }
`;

const KakaoLogin = styled.button`
  width: 80%;
  height: 3vw;
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
    border-right: 1px solid orange;
    font-size: max(12px, 0.9vw);
    flex: 1 0 auto;
    text-align: center;
  }
  > .submenu:nth-child(2) {
    border-right: 0;
  }
`;

const KakaoWrap = styled.div`
  flex: 1 1 auto;
`;

const TabWrap = styled.div`
  flex: 3 1 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
`;

const LoginBox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  > #a {
    width: 80%;
    flex: 2 1 auto;
    border: 1px solid red;
    box-sizing: border-box;
    > label {
      display: block;
      text-align: left;
      position: relative;
    }
    > input {
      width: 100%;
      height: 30px;
      font-size: max(12px, 0.9vw);
      background: transparent;
      outline: none;
      border: 0;
      border-bottom: 2px solid black;
      justify-content: center;
    }
    > button {
      width: 200px;
      height: 50px;
      background-color: yellow;
    }
  }
`;

const SignupBox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  > #a {
    width: 80%;
    flex: 2 1 auto;
    border: 1px solid red;
    box-sizing: border-box;
    > label {
      font-size: max(13px, 0.8vw);
      display: block;
      text-align: left;
      position: relative;
    }
    > input {
      width: 100%;
      height: 30px;
      font-size: max(12px, 0.8vw);
      background: transparent;
      outline: none;
      border: 0;
      border-bottom: 2px solid black;
      justify-content: center;
    }
    > button {
      width: 100%;
      height: 3vw;
      min-height: 30px;
      background-color: yellow;
      margin-top: 3vw;
      border: 2px solid black;
      border-radius: 20px;
    }
  }
`;

function Modal() {
  const [currentTab, setCurrentTab] = useState(1);

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };
  return (
    <>
      <ModalBack>
        <ModalBox>
          <WelcomeBox>
            <img src={logo} alt="logo" />
            <div>&times;</div>
            <h2>만.반.잘.부!</h2>
            <p>만나서 반가워 잘 부탁해!</p>
          </WelcomeBox>

          <KakaoWrap>
            <KakaoLogin>
              <FontAwesomeIcon icon={faComment} id="socialLogin" />
              <p>카카오 로그인</p>
            </KakaoLogin>
          </KakaoWrap>

          <TabWrap>
            <TabMenu>
              <li className="submenu">로그인</li>
              <li className="submenu">회원가입</li>
            </TabMenu>

            {currentTab === 0 ? (
              <LoginBox>
                <div id="a">
                  <label htmlFor="email">Email</label>
                  <input type="text" placeholder="이메일을 입력해주세요" />
                  <label htmlFor="password">password</label>
                  <input type="text" placeholder="비밀번호를 입력해주세요" />
                  <button>Submit</button>
                </div>
              </LoginBox>
            ) : (
              <SignupBox>
                <div id="a">
                  <label htmlFor="email">UserName</label>
                  <input type="text" placeholder="사용자 이름을 입력해주세요" />
                  <label htmlFor="email">Email</label>
                  <input type="text" placeholder="이메일을 입력해주세요" />
                  <label htmlFor="email">Phone Number</label>
                  <input
                    type="text"
                    placeholder="사용자 핸드폰 번호를 입력해주세요"
                  />
                  <label htmlFor="password">password</label>
                  <input type="text" placeholder="비밀번호를 입력해주세요" />
                  <label htmlFor="password">password</label>
                  <input
                    type="text"
                    placeholder="비밀번호를 다시 입력해주세요"
                  />
                  <button>Submit</button>
                </div>
              </SignupBox>
            )}
          </TabWrap>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default Modal;
