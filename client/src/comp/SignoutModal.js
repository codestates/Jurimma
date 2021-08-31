import React, { useState } from "react";
import styled from "styled-components";
import logo from "../signout-logo.png";

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
  margin-top: 30px;
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

const SignoutButton = styled.button`
  width: 18%;
  height: max(2vw, 20px);
  background-color: black;
  color: white;
  margin: 0 auto;
  margin-top: max(2vw, 18px);
  border-radius: 20px;
  font-size: max(0.8vw, 12px);
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
    background-color: #ff2400;
    border: none;
  }
`;

const CancelButton = styled.button`
  width: 40%;
  height: 2.5vw;
  min-height: 35px;
  background-color: black;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
  margin-left: 10px;
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

const KakaoWrap = styled.div``;

function SignoutModal({ setOnSignoutModal }) {
  return (
    <>
      <ModalBack>
        <ModalBox>
          <ByeBox>
            <img src={logo} alt="logo" />
            <div onClick={() => setOnSignoutModal(false)}>&times;</div>
            <p>진짜로 갈거에요...?</p>
          </ByeBox>

          <KakaoWrap>
            <CancelButton onClick={() => setOnSignoutModal(false)}>
              <p>떠나지 않기</p>
            </CancelButton>
            <CancelButton onClick={() => setOnSignoutModal(false)}>
              <p>떠나지 않기</p>
            </CancelButton>
            <SignoutButton>
              <p>떠나기...</p>
            </SignoutButton>
          </KakaoWrap>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default SignoutModal;
