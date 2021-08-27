import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";
import dummyData from "../dummy/dummyData";

function Search() {
  return (
    <section>
      <SearchInput />
      <SearchResult data={dummyData.word} />
    </section>
  );
}

export default Search;
