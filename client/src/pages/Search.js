import styled from "styled-components";
import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";

const SearchSection = styled.section`
  min-height:55vh;
`

function Search({data, isLogin, setWriteModal, setOnModal}) {
  return (
    <SearchSection>
      <SearchInput />
      <SearchResult data={data} isLogin={isLogin} setWriteModal={setWriteModal} setOnModal={setOnModal}/>
    </SearchSection>
  );
}

export default Search;
