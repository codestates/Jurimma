import React from "react";
import styled from "styled-components";

const SearchWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2vh 0vh 4vh;
  text-align: center;
  > .searchInput {
    width: 60%;
    height: 40px;
    border: 2px solid #000;
    border-radius: 20px;
    margin-right: 10px;
    outline: none;
    padding-left: 20px;
  }
  > .searchBtn {
    width: 90px;
    height: 44px;
    background-color: #000;
    color: #fff;
    border: none;
    margin-top: 1vh;
    border-radius: 20px;
  }
`;
function SearchInput() {
  return (
    <>
      <SearchWrap className="searchWrap">
        <input className="searchInput"></input>
        <button className="searchBtn">검색하기</button>
      </SearchWrap>
    </>
  );
}

export default SearchInput;
