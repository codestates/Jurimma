import styled from "styled-components";
import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";

const SearchSection = styled.section`
  min-height:55vh;
`

function Search({data}) {
  return (
    <SearchSection>
      <SearchInput />
      <SearchResult data={data} />
    </SearchSection>
  );
}

export default Search;
