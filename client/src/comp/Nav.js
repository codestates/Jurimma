import React, { useState} from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import profile from "../none_profile.jpeg";

// 768px 이상에서는 nav가 보이고, 아이콘 안보임
// 768px 이하는 nav 안보이고 아이콘 보임

function Nav({ isLogin, setOnModal, setisLogin }) {
  const [isShow, setIsShow] = useState("none");
  const showNavClick = () => {
    isShow === "none" ? setIsShow("flex") : setIsShow("none");
  };
  const logout = () => {
    setisLogin(false)

  }

  const NavBtn = styled.button`
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 0px;
      background-color: transparent;
      width: max(3vw, 60px);
      height: max(3vw, 60px);
      font-size: max(3vw, 30px);
      transition: all 0.3s;
      cursor: pointer;
      z-index: 100;
      :hover {
        color: #fff;
      }
    }
  `;

  const NavWrap = styled.nav`
    @media screen and (max-width: 767px) {
      flex: none;
      position: absolute;
      width: 100%;
      height: 100vh;
      display: ${isShow};
      justify-content: center;
      align-items: center;
    }
    background-color: #38372e;
    flex: 1 1 auto;
    display: flex;
    min-width:290px;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    /* z-index:100; */
  `;

  const Button1 = styled.button`
    width: 20vh;
    height: 7vh;
    border: none;
    border-radius: 40px;
    font-size: 0.98rem;
    font-weight: 700;
    display: block;
    margin-top: 5vh;
    transition: 0.3s;
    cursor: pointer;
    :hover {
      background-color: black;
      color: white;
    }
    &:nth-child(1) {
      margin-top: 0;
    }
  `;

  const Button2 = styled.button`
    width: 20vh;
    height: 7vh;
    border: none;
    border-radius: 40px;
    font-size: 0.98rem;
    font-weight: 700;
    display: block;
    margin: 5vh auto 0;
    cursor: pointer;
    transition: 0.3s;
    :hover {
      background-color: black;
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
      margin-bottom: 5vh;
    }
    > button {
      width: 20vh;
      height: 7vh;
      border: none;
      border-radius: 40px;
      font-size: 0.98rem;
      font-weight: 700;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
    > button:hover {
      background-color: black;
      color: white;
      transition: 0.3s;
    }
  `;

  return (
    <>
      {isLogin ? (
        <>
          <NavBtn onClick={showNavClick}>
            <FontAwesomeIcon icon={faBars} />
          </NavBtn>
          <NavWrap>
            <div>
              <ProfileWrap>
                <img src={profile} alt="none" />
                <button>
                  <Link to="/mypageEdit">
                    EDIT PROFILE
                  </Link>
                </button>
              </ProfileWrap>
              <Button2 onClick={logout}>LOGOUT</Button2>
              <Button2>
                <Link to="/mypage">MYPAGE</Link>
              </Button2>
            </div>
          </NavWrap>
        </>
      ) : (
        <>
          <NavBtn onClick={showNavClick}>
            <FontAwesomeIcon icon={faBars} />
          </NavBtn>
          <NavWrap>
            <div>
              <Button1 onClick={() => setOnModal(true)}>LOGIN / SIGNUP</Button1>
              <Button1 onClick={() => setOnModal(true)}>MYPAGE</Button1>
            </div>
          </NavWrap>
        </>
      )}
    </>
  );
}

export default Nav;
