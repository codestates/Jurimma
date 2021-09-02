import styled from "styled-components";
import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";

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
  searchWord,
}) {
  return (
    <SearchSection>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchWord={searchWord}
      />
      {searched ? (
        <SearchResult
          result={result}
          isLogin={isLogin}
          setWriteModal={setWriteModal}
          setOnModal={setOnModal}
          setMoreClickModal={setMoreClickModal}
          setCurrResult={setCurrResult}
        />
      ) : null}
    </SearchSection>
  );
}

export default Search;
