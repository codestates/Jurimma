import styled from "styled-components";
import profile from "../none_profile.jpeg";
import { Redirect } from "react-router";
import { useState } from "react";

const MyEditWrap = styled.div`
  width: 100%;
  height: 55vh;
  @media screen and (max-width: 767px) {
    height:auto;
  }
`;
const EditWrap = styled.div`
  display: flex;
  width: 75%;
  max-width:1500px;
  margin: 0 auto;
  flex-wrap: wrap;
  max-height:55vh;
  @media screen and (max-width: 767px) {
    flex-wrap: nowrap;
    flex-direction: column;
    max-height:none;
  }
`;
const MyEdit = styled.div`
  flex: 2 1 auto;
  > form > input {
    display: block;
    width: 100%;
    height: max(40px, 3vw);
    margin-bottom: max(20px,1vw);
    background-color: transparent;
    border-bottom: 2px solid #000;
    transition: all 0.3s;
    line-height: max(50px, 3vw);
    font-size: max(16px, 0.8vw);
    padding-left: max(3vw, 50px);
    :focus {
      outline: 0;
      border-bottom: 2px solid #fff;
    }
    :last-child {
      margin-bottom: 6vw;
    }

    @media screen and (min-width: 767px) {
      width: 90%;
    }
  }
  > form > input:hover::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-size: 20px;
    transition: 0.3s;
  }
  > form > #username {
    background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881472814257942528/2561496_user_icon.png");
    background-size: max(1.5vw, 18px);
    background-repeat: no-repeat;
    background-position: 0.5vw;
  }
  > form > #oldPassword {
    background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881480107225669642/4857866_key_lock_password_protection_secure_icon.png");
    background-size: max(1.5vw, 18px);
    background-repeat: no-repeat;
    background-position: 0.5vw;
  }
  > form > #newPassword {
    background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881480107225669642/4857866_key_lock_password_protection_secure_icon.png");
    background-size: max(1.5vw, 18px);
    background-repeat: no-repeat;
    background-position: 0.5vw;
  }
  > form > #newRePassword {
    background-image: url("https://cdn.discordapp.com/attachments/878131777485565993/881480107225669642/4857866_key_lock_password_protection_secure_icon.png");
    background-size: max(1.5vw, 18px);
    background-repeat: no-repeat;
    background-position: 0.5vw;
  }
  > #submitBtns {
    display: flex;
    justify-content: space-between;
    > #editSave,
    #editCancel {
      margin: 0 auto;
      width: max(90px, 10vw);
      height: max(40px, 3vw);
      border-radius: 40px;
      background-color: #fff;
      color: #000;
      border: 2px solid black;
      cursor: pointer;
      transition: all 0.3s;
      :hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 767px) {
    height:auto;
    margin-bottom: 10vw;
  }
`;
const MyEditExtra = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  &&& {
    font-size: max(14px, 0.6vw);
  }
  > img {
    margin: 0 auto;
    width: max(12vw, 120px);
    height: max(12vw, 120px);
    border-radius: 25vh;
    border:3px solid #000;
    margin-bottom: 2vw;
  }
  > #editPic {
    margin: 0 auto;
    width: max(100px, 10vw);
    height: max(40px, 3vw);
    border-radius: 40px;
    background-color: #fff;
    color: #000;
    border: 2px solid black;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 1vw;
    :hover {
      background-color: #000;
      color: #fff;
    }
  }
  > #signOut {
    margin: 0 auto;
    width: max(60px, 6vw);
    height: max(30px, 3vw);
    border-radius: 40px;
    background-color: #ff2400;
    color: #fff;
    cursor: pointer;
    font-size: max(12px, 0.5vw);
  }
`;

function MypageEdit({ isLogin, setOnSignoutModal }) {
  return (
    <>
      {isLogin ? (
        <MyEditWrap>
            <EditWrap>
              <MyEdit>
                <form>
                  <input
                    type="text"
                    id="username"
                    placeholder="사용자 이름"
                  ></input>
                  <input
                    type="password"
                    id="oldPassword"
                    placeholder="예전 비밀번호"
                  ></input>
                  <input
                    type="Password"
                    id="newPassword"
                    placeholder="새로운 비밀번호"
                  ></input>
                  <input
                    type="password"
                    id="newRePassword"
                    placeholder="새로운 비밀번호 재입력"
                  ></input>
                </form>
                <div id="submitBtns">
                  <button id="editSave">저장하기</button>
                  <button id="editCancel">되돌리기</button>
                </div>
              </MyEdit>
              <MyEditExtra>
                <img src={profile} alt="이용자 사진" />
                <button id="editPic">사진 변경하기</button>
                <button id="signOut" onClick={() => setOnSignoutModal(true)}>
                  탈퇴하기
                </button>
              </MyEditExtra>
            </EditWrap>
        </MyEditWrap>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
export default MypageEdit;

/*
<div>
    <form>
        <label htmlFor="username"></label>
        <input type="text" id="username">{username}</input>

        <label htmlFor="oldPassword"></label>
        <input type="password" id="oldPassword"></input>

        <label htmlFor="newPassword""></label>
        <input type="Password" id="newPassword"></input>

        <label htmlFor="newRePassword"></label>
        <input type="newRePassword" id="newRePassword"></input>
    </form>
    <div id="submitBtns">
        <button id="editSave">저장하기</button>
        <button id="editCancel">되돌리기</button>
    </div>
</div>

*/
