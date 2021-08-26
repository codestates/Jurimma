import React from "react";
import styled from "styled-components";

function Nav({ data }) {
  const NavWrap = styled.nav`
    background-color: #38372e;
    /* background-color: black; */
    height: 100vh;
    flex: 1 1 auto;
    display: grid;
    place-items: center;
  `;

  const Button = styled.button`
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

  return (
    <>
      <NavWrap>
        <div>
          <Button>LOGIN / SIGNUP</Button>
          <Button>MYPAGE</Button>
        </div>
      </NavWrap>
    </>
  );
}

export default Nav;
