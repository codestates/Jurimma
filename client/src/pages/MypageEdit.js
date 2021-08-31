import styled from "styled-components";
import profile from "../none_profile.jpeg";
import { Redirect, useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const checkModule = require("../checkModule");

const MyEditWrap = styled.div`
  width: 100%;
  height: 55vh;
  @media screen and (max-width: 767px) {
    height: auto;
  }
`;
const EditWrap = styled.div`
  display: flex;
  width: 75%;
  max-width: 1500px;
  margin: 0 auto;
  flex-wrap: wrap;
  max-height: 55vh;
  @media screen and (max-width: 767px) {
    flex-wrap: nowrap;
    flex-direction: column;
    max-height: none;
  }
`;
const MyEdit = styled.div`
  flex: 2 1 auto;
  > form > input {
    display: block;
    width: 100%;
    height: max(40px, 3vw);
    margin-bottom: max(20px, 1vw);
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
    height: auto;
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
    border: 3px solid #000;
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

function MypageEdit({
  isLogin,
  setOnSignoutModal,
  userInfo,
  setCloseLogoutModal,
  accToken,
  setAccToken,
  setisLogin,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();

  const [editUser, setEditUser] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    newPasswordRe: "",
  });

  const handleKeyPressEdit = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleEdit();
    }
  };

  const handleEditInputValue = (key) => (e) => {
    setEditUser({ ...editUser, [key]: e.target.value });
  };

  const handleEdit = async () => {
    try {
      if (
        !editUser.username ||
        !editUser.oldPassword ||
        !editUser.newPassword ||
        !editUser.newPasswordRe
      ) {
        alert("정보를 모두 입력해주세요.");
      } else if (checkModule.OnlyKorEng(editUser.username) === false) {
        alert("유효하지 않은 이름입니다.");
      } else if (
        checkModule.IsValidatePassword(editUser.newPassword) === false
      ) {
        alert("유효하지 않은 비밀번호 입니다.");
      } else if (editUser.newPassword !== editUser.newPasswordRe) {
        alert("비밀번호를 확인해주세요.");
      } else {
        delete editUser.newPasswordRe;
        const editRes = await axios({
          url: `${url}/user/edit`,
          method: "patch",
          headers: { authorization: `Bearer ${accToken}` },
          data: editUser,
        });
        if (editRes.data.accessToken) {
          setAccToken(editRes.data.accessToken);
        }
        alert("정보가 업데이트 되었습니다. 다시 로그인해주세요.");
        await axios.post(`${url}/user/logout`, null, {
          headers: { authorization: `Bearer ${accToken}` },
        });
        setCloseLogoutModal(false);
        setAccToken(null);
        setisLogin(false);
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      alert("다시 입력해주세요.");
    }
  };

  const handleCancel = () => {
    setEditUser({
      username: "",
      oldPassword: "",
      newPassword: "",
      newPasswordRe: "",
    });
  };

  const handleUserPic = async () => {
    try {
      const userPicEdit = await axios({
        url: `${url}/user/userPicEdit`,
        method: "patch",
        headers: { authorization: `Bearer ${accToken}` },
        data: { userPic: userInfo.userPic },
      });
      if (userPicEdit.data.accessToken) {
        setAccToken(userPicEdit.data.accessToken);
      }
      alert("사진이 변경되었습니다. 다시 로그인해주세요.");
      await axios.post(`${url}/user/logout`, null, {
        headers: { authorization: `Bearer ${accToken}` },
      });
      setCloseLogoutModal(false);
      setAccToken(null);
      setisLogin(false);
      localStorage.clear();
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요.");
    }
  };

  return (
    <>
      {isLogin ? (
        <MyEditWrap>
          <EditWrap>
            <MyEdit>
              {" "}
              {/* 회원정보 수정창 */}
              <form>
                <input
                  type="text"
                  id="username"
                  placeholder="사용자 이름"
                  onChange={handleEditInputValue("username")}
                  onKeyPress={handleKeyPressEdit}
                  value={editUser.username}
                ></input>
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="예전 비밀번호"
                  onChange={handleEditInputValue("oldPassword")}
                  onKeyPress={handleKeyPressEdit}
                  value={editUser.oldPassword}
                ></input>
                <input
                  type="Password"
                  id="newPassword"
                  placeholder="새로운 비밀번호"
                  onChange={handleEditInputValue("newPassword")}
                  onKeyPress={handleKeyPressEdit}
                  value={editUser.newPassword}
                ></input>
                <input
                  type="password"
                  id="newRePassword"
                  placeholder="새로운 비밀번호 재입력"
                  onChange={handleEditInputValue("newPasswordRe")}
                  onKeyPress={handleKeyPressEdit}
                  value={editUser.newPasswordRe}
                ></input>
              </form>
              <div id="submitBtns">
                <button id="editSave" onClick={handleEdit}>
                  저장하기
                </button>
                <button id="editCancel" onClick={handleCancel}>
                  되돌리기
                </button>
              </div>
            </MyEdit>
            <MyEditExtra>
              <img src={userInfo.userPic} alt="이용자 사진" />
              <button id="editPic" onClick={handleUserPic}>
                사진 변경하기
              </button>
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
