import React, { useState } from "react";
import styled from "styled-components";
import logo from "../jurimma_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

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
    font-size: 40px;
    position: absolute;
    top: 15px;
    right: 30px;
  }
  > h2 {
    // font-size 꼭 찾아보기
    font-size: max(20px, 1.8vw);
  }
  > p {
    font-size: max(12px, 0.8vw);
    padding: 13px;
  }
`;

const KakaoLogin = styled.button`
  width: 80%;
  height: 3vw;
  min-height: 40px;
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
  height: 3vw;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  background-color: red;
  min-height: 40px;
  > .submenu {
    font-size: max(12px, 0.9vw);
    flex: 1 0 auto;
    text-align: center;
  }
`;

const Desc = styled.div`
  background-color: red;
`;

const KakaoWrap = styled.div`
  flex: 1 1 auto;
`;

const TabWrap = styled.div`
  flex: 10 1 auto;
`;

const LoginBox = styled.div`
  background-color: pink;
  display: flex;
  flex-direction: column;
  > input {
    width: 80%;
    margin-top: 20px;
    flex: 1 1 auto;
  }
`;

function Modal() {
  const [currentTab, setCurrentTab] = useState(0);

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
            <p>만난서 반가워 잘 부탁해!</p>
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

            <Desc>
              {currentTab === 0 ? (
                <LoginBox>
                  <input></input>
                  <input></input>
                </LoginBox>
              ) : null}
            </Desc>
          </TabWrap>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default Modal;
