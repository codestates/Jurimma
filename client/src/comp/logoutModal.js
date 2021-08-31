import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import logo from "../jurimma_logo.png";
import axios from "axios";
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
  height: max(25vw, 350px);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 30px;
  min-width: 300px;
  text-align: center;
  position: relative;
  justify-items: center;
`;
const ByeBox = styled.div`
  margin-top: 50px;
  > img {
    width: max(10vw, 150px);
    height: max(10vw, 150px);
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

const LogoutButton = styled.button`
  width: 80%;
  height: 2.5vw;
  min-height: 35px;
  background-color: black;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
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
    background-color: rgba(158, 230, 197, 0.8);
    color: black;
    font-weight: bold;
    border: 2px solid black;
  }
`;

const LogoutWrap = styled.div``;

function LogoutModal({
  setCloseLogoutModal,
  setisLogin,
  accToken,
  setAccToken,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();
  const logoutBtn = async () => {
    await axios.post(`${url}/user/logout`, null, {
      headers: { authorization: `Bearer ${accToken}` },
    });
    setCloseLogoutModal(false);
    setAccToken(null);
    setisLogin(false);
    localStorage.clear();
    history.push("/");
  };
  return (
    <>
      <ModalBack>
        <ModalBox>
          <ByeBox>
            <img src={logo} alt="logo" />
            <div onClick={() => setCloseLogoutModal(false)}>&times;</div>
            <h2>잘.반.또.만!</h2>
            <p>잘 가 반가웠어 또 만나!</p>
          </ByeBox>

          <LogoutWrap>
            <LogoutButton onClick={logoutBtn}>
              <p>로그아웃 하기</p>
            </LogoutButton>
          </LogoutWrap>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default LogoutModal;
