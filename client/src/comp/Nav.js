import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import profile from "../none_profile.jpeg";
import axios from "axios";
axios.defaults.withCredentials = true;

const NavBtn = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0px;
    background-color: transparent;
    width: max(3vw, 60px);
    height: max(3vw, 60px);
    font-size: max(3vw, 30px);
    transition: all 0.3s;
    cursor: pointer;
    z-index: 100;
    cursor: pointer;
    :hover {
      color: #fff;
    }
  }
`;

const Button1 = styled.button`
  width: 100%;
  min-width: 20vh;
  height: 7vh;
  border: none;
  border-radius: 40px;
  // font-size: max(1.1rem, 1vw);
  font-weight: 700;
  display: block;
  margin-top: 5vh;
  transition: 0.3s;
  cursor: pointer;
  background-color: rgba(158, 230, 197, 0.4);
  border: 2px solid black;
  cursor: pointer;
  > a {
    display: block;
    width: 100%;
    height: auto;
    line-height: 7vh;
    box-sizing: border-box;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
  &:nth-child(1) {
    margin-top: 0;
  }
`;

const Button2 = styled.button`
  width: 100%;
  min-width: 20vh;
  height: 7vh;
  border-radius: 40px;
  font-size: max(1.1rem, 1vw);
  font-weight: 700;
  display: block;
  margin: 5vh auto 0;
  cursor: pointer;
  transition: 0.3s;
  background-color: rgba(158, 230, 197, 0.4);
  border: 2px solid black;
  cursor: pointer;
  > a {
    display: block;
    width: 100%;
    height: auto;
    line-height: 7vh;
    box-sizing: border-box;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
  &:nth-child(1) {
    margin-top: 0;
  }
`;

const ProfileWrap = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  > img {
    width: 22vh;
    height: 22vh;
    border-radius: 25vh;
    border: 3px solid black;
    margin-bottom: 5vh;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.8);
    transition: 0.2s;
  }
  > img:hover {
    transform: translateY(-5%);
  }
  > button {
    width: 100%;
    min-width: 20vh;
    height: 7vh;
    border: none;
    border-radius: 40px;
    font-size: max(1.1rem, 1vw);
    font-weight: 700;
    display: block;
    margin: 0 auto;
    cursor: pointer;
    background-color: rgba(158, 230, 197, 0.4);
    border: 2px solid black;
    box-sizing: border-box;
    > a {
      display: block;
      width: 100%;
      height: auto;
      line-height: 7vh;
      box-sizing: border-box;
    }
  }
  > button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    transition: 0.3s;
  }
  > p {
    margin-top: -3.3vh;
    font-size: max(1.1rem, 1vw);
    margin-bottom: 1.5vh;
    font-weight: 700;
  }
`;

function Nav({
  isLogin,
  accToken,
  setAccToken,
  setOnModal,
  setUserContent,
  setisLogin,
  setCloseLogoutModal,
  userInfo,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [isShow, setIsShow] = useState("none");
  const showNavClick = () => {
    isShow === "none" ? setIsShow("flex") : setIsShow("none");
  };
  const logoutBtn = () => {
    setCloseLogoutModal(true);
  };

  // const NavWrap = styled.div`
  //   flex: 1 1 auto;
  //   background-color: #edfff7;
  //   display:block;
  //   @media screen and (max-width: 767px) {
  //     display: block;
  //   }
  // `
  const Navbar = styled.nav`
    @media screen and (max-width: 767px) {
      flex: none;
      position: fixed;
      width: 100%;
      height: 100%;
      display: ${isShow};
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    background-color: rgba(237, 255, 247, 0.8);
    box-shadow: 10px 0px 100px darkgray;
    position: sticky;
    top: 0;
    flex: 1 1 auto;
    display: flex;
    min-width: 290px;
    height: 100vh;
    justify-content: center;
    align-items: center;
    z-index: 50;
  `;

  const searchUserWord = async () => {
    try {
      let userContent = await axios.get(`${url}/myContents`, {
        header: { authorization: `Bearer ${accToken}` },
      });
      if (userContent.data.accessToken) {
        setAccToken(userContent.data.accessToken);
      }
      setUserContent({
        data: userContent.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      });
    } catch (err) {
      console.log(err);
      alert("다시 로그인 해주세요.");
    }
  }; // 유저가 쓴 글 가져오기

  return (
    <>
      {isLogin ? (
        <>
          <NavBtn onClick={showNavClick}>
            <FontAwesomeIcon icon={faBars} />
          </NavBtn>
          <Navbar>
            <div id="justifyPos">
              <ProfileWrap>
                <img
                  src={userInfo !== null ? userInfo.userPic : profile}
                  alt="none"
                />
                <p>
                  {userInfo.username.slice(0, 1)}하! ({userInfo.username} 하이
                  라는 뜻😁)
                </p>
                <button>
                  <Link to="/mypageEdit">EDIT PROFILE</Link>
                </button>
              </ProfileWrap>
              <Button2 onClick={logoutBtn}>LOGOUT</Button2>
              <Button2 onClick={searchUserWord}>
                <Link to="/mypage">MYPAGE</Link>
              </Button2>
            </div>
          </Navbar>
        </>
      ) : (
        <>
          <NavBtn onClick={showNavClick}>
            <FontAwesomeIcon icon={faBars} />
          </NavBtn>
          <Navbar>
            <div>
              <ProfileWrap>
                <img src={profile} alt="none" />
                <p>
                  <br></br>
                  <br></br>로그인하면 원하는 줄임말을 추가할 수 있어요!
                </p>
              </ProfileWrap>
              <Button1 onClick={() => setOnModal(true)}>LOGIN / SIGNUP</Button1>
              <Button1 onClick={() => setOnModal(true)}>MYPAGE</Button1>
            </div>
          </Navbar>
        </>
      )}
    </>
  );
}

export default Nav;
