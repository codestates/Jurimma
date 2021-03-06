import React from "react";
import styled from "styled-components";

const SearchWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2vh 0vh 4vh;
  text-align: center;
  box-sizing: border-box;
  > .searchInput {
    width: 58%;
    height: 4vw;
    min-height: 35px;
    border: 2px solid #000;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 30px;
    margin-right: 10px;
    outline: none;
    padding-left: 20px;
    font-size: max(14px, 1vw);
  }
  > .searchBtn {
    width: 6vw;
    height: 3.2vw;
    min-height: 35px;
    min-width: 50px;
    background-color: #000;
    color: #fff;
    border: none;
    margin-top: 1vh;
    border-radius: 30px;
    font-size: max(0.8vw, 11px);
    border: 2px solid black;
    cursor: pointer;
    transition: 0.3s;
  }
  > .searchBtn:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    font-weight: bold;
    border: 2px solid black;
  }
`;
function SearchInput({ searchValue, setSearchValue, searchWord }) {
  const handleSearchInputValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPressSearch = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      searchWord(e.target.value);
    }
  };

  const searchBegin = (searchValue) => {
    if (searchValue === "") {
      alert("검색어를 입력해주세요.");
    } else {
      searchWord(searchValue);
    }
  };
  return (
    <>
      <SearchWrap className="searchWrap">
        <input
          className="searchInput"
          placeholder="궁금한걸 입력해보세요"
          value={searchValue}
          onChange={handleSearchInputValue}
          onKeyPress={handleKeyPressSearch}
        ></input>
        <button className="searchBtn" onClick={() => searchBegin(searchValue)}>
          검색하기
        </button>
      </SearchWrap>
    </>
  );
}

export default SearchInput;
