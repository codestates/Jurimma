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

function Search({ data, isLogin, setWriteModal, setOnModal, searched }) {
  return (
    <SearchSection>
      <SearchInput />
      {searched ? (
        <SearchResult
          data={data}
          isLogin={isLogin}
          setWriteModal={setWriteModal}
          setOnModal={setOnModal}
        />
      ) : (
        <div id="hi">하이~ 에이치아이~</div>
      )}
    </SearchSection>
  );
}

export default Search;
