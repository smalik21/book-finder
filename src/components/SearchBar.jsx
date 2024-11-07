import PropTypes from "prop-types";

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  setSearchType: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default function SearchBar({
  query,
  setQuery,
  searchType,
  setSearchType,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) onSearch(query, searchType);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mb-4 mx-auto max-w-xl bg-secondary rounded-lg"
    >
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="p-1 sm:p-2 text-textPrimary bg-secondary rounded-l outline-none border-r border-r-primary"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="subject">Subject</option>
      </select>
      <input
        type="text"
        placeholder={`Search by ${searchType}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-20 flex-grow p-2 sm:pl-4 bg-transparent outline-none border-r border-r-primary"
      />
      <button
        type="submit"
        className="p-2 sm:px-4 text-textPrimary bg-highlight rounded-r"
      >
        Search
      </button>
    </form>
  );
}
