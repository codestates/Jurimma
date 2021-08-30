import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import profile from "../none_profile.jpeg";

function Nav({ isLogin, setOnModal, setisLogin, setCloseLogoutModal }) {
  const [isShow, setIsShow] = useState("none");
  const showNavClick = () => {
    isShow === "none" ? setIsShow("flex") : setIsShow("none");
  };
  const logoutBtn = () => {
    setCloseLogoutModal(true);
  };

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

  // const NavWrap = styled.div`
  //   flex: 1 1 auto;
  //   background-color: #edfff7;
  //   display:block;
  //   @media screen and (max-width: 767px) {
  //     display: block;
  //   }
  // `
  const Nav = styled.nav`
    @media screen and (max-width: 767px) {
      flex: none;
      position: fixed;
      width: 100%;
      height: 100%;
      display: ${isShow};
      justify-content: center;
      align-items: center;
      overflow:hidden;
    }
    background-color: #edfff7;
    position:sticky;
    top:0;
    flex: 1 1 auto;
    display: flex;
    min-width: 290px;
    height:100vh;
    justify-content: center;
    align-items: center;
    z-index:50;
  `;

  const Button1 = styled.button`
    width: 100%;
    min-width:20vh;
    height: 7vh;
    border: none;
    border-radius: 40px;
    font-size: 0.98rem;
    font-weight: 700;
    display: block;
    margin-top: 5vh;
    transition: 0.3s;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    cursor: pointer;
    > a{
        display:block;
        width:100%;
        height:auto;
        line-height:7vh;
        box-sizing:border-box;
      }
    :hover {
      background-color: black;
      color: white;
    }
    &:nth-child(1) {
      margin-top: 0;
    }
  `;

  const Button2 = styled.button`
    width: 100%;
    min-width:20vh;
    height: 7vh;
    border-radius: 40px;
    font-size: 0.98rem;
    font-weight: 700;
    display: block;
    margin: 5vh auto 0;
    cursor: pointer;
    transition: 0.3s;
    background-color: white;
    border: 2px solid black;
    cursor: pointer;
    > a{
        display:block;
        width:100%;
        height:auto;
        line-height:7vh;
        box-sizing:border-box;
      }
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
      border: 3px solid black;
      margin-bottom: 5vh;
    }
    > button {
      width: 100%;
      min-width:20vh;
      height: 7vh;
      border: none;
      border-radius: 40px;
      font-size: 0.98rem;
      font-weight: 700;
      display: block;
      margin: 0 auto;
      cursor: pointer;
      background-color: white;
      border: 2px solid black;
      box-sizing:border-box;
      > a{
        display:block;
        width:100%;
        height:auto;
        line-height:7vh;
        box-sizing:border-box;
      }
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
        <Nav>
          <div id="justifyPos">
            <ProfileWrap>
              <img src={profile} alt="none" />
              <button>
                <Link to="/mypageEdit">EDIT PROFILE</Link>
              </button>
            </ProfileWrap>
            <Button2 onClick={logoutBtn}>LOGOUT</Button2>
            <Button2>
              <Link to="/mypage">MYPAGE</Link>
            </Button2>
          </div>
        </Nav>
      </>
      ) : (
        <>
            <NavBtn onClick={showNavClick}>
              <FontAwesomeIcon icon={faBars} />
            </NavBtn>
            <Nav>
              <div>
                <Button1 onClick={() => setOnModal(true)}>LOGIN / SIGNUP</Button1>
                <Button1 onClick={() => setOnModal(true)}>MYPAGE</Button1>
              </div>
            </Nav>
        </>
      )}
    </>
  );
}

export default Nav;
