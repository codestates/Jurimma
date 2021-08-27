import SearchInput from "../comp/SearchInput";
import SearchResult from "../comp/SearchResult";

function Search({data}) {
  return (
    <section>
      <SearchInput />
      <SearchResult data={data} />
    </section>
  );
}

export default Search;
