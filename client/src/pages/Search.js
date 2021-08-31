import { useState } from "react";
import styled from "styled-components";
import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";
import SearchMore from "./SearchMore";

const SearchSection = styled.section`
  min-height: 55vh;
  > #hi {
    text-align: center;
    font-size: max(30px, 3vw);
    margin-top: 50px;
  }
`;

function Search({
  isLogin,
  setWriteModal,
  setOnModal,
  searched,
  setSearched,
  setMoreClickModal,
  searchValue,
  setSearchValue,
  accToken,
  setAccToken,
  result,
  setResult,
  setCurrResult,
}) {
  return (
    <SearchSection>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearched={setSearched}
        setResult={setResult}
      />
      {searched ? (
        <SearchResult
          result={result}
          setResult={setResult}
          isLogin={isLogin}
          setWriteModal={setWriteModal}
          setOnModal={setOnModal}
          setMoreClickModal={setMoreClickModal}
          searchValue={searchValue}
          accToken={accToken}
          setAccToken={setAccToken}
          setCurrResult={setCurrResult}
        />
      ) : (
        <div id="hi">하이~ 에이치아이~</div>
      )}
    </SearchSection>
  );
}

export default Search;
