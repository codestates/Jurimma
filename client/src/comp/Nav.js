import React, { useState } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"
import profile from "../none_profile.jpeg";

function Nav({ isLogin }) {
  const NavWrap = styled.nav`
    background-color: #38372e;
    /* background-color: black; */
    position: sticky;
    top: 0;
    height: 100vh;
    flex: 1 1 auto;
    display: grid;
    place-items: center;
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
    &:nth-child(1) {
      margin-top: 0;
    }
  `;

  const ProfileWrap = styled.div`
    width: 100%;
    text-align: center;
    > img {
      width: 22vh;
      height: 22vh;
      background-color: Red;
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
    }
  `;

  return (
    <>
      {isLogin ? (
        <NavWrap>
          <div>
            <ProfileWrap>
              <img src={profile} alt="none" />
              <button>EDIT PROFILE</button>
            </ProfileWrap>
            <Button2>LOGOUT</Button2>
            <Button2>
              <Link to="/mypage">
                MYPAGE
              </Link>
            </Button2>
          </div>
        </NavWrap>
      ) : (
        <NavWrap>
          <div>
            <Button1>LOGIN / SIGNUP</Button1>
            <Button1>MYPAGE</Button1>
          </div>
        </NavWrap>
      )}
    </>
  );
}

export default Nav;
