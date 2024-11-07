import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { fetchBooks } from "../api/openLibrary";
import Title from "../components/Title";

const cache = {};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("popular");
  const [searchType, setSearchType] = useState("subject");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  // Memoize the updateURL function
  const updateURL = useCallback(
    (query, searchType, page) => {
      const params = new URLSearchParams({
        query,
        type: searchType,
        page,
      });
      navigate({ search: params.toString() });
    },
    [navigate]
  );

  // Memoize the handleSearch function
  const handleSearch = useCallback(
    async (searchQuery, type, currentPage = 1) => {
      const cacheKey = `${searchQuery}_${type}_${currentPage}`;
      setQuery(searchQuery);
      setSearchType(type);
      setPage(currentPage);
      setLoading(true); // Start loading

      if (cache[cacheKey]) {
        setResults(cache[cacheKey].docs);
        setTotalResults(cache[cacheKey].numFound);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false); // Stop loading after cache retrieval
      } else {
        const data = await fetchBooks(searchQuery, type, currentPage, limit);
        setResults(data.docs);
        setTotalResults(data.numFound);
        cache[cacheKey] = data;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false); // Stop loading after fetch
      }

      updateURL(searchQuery, type, currentPage);
    },
    [limit, updateURL]
  );

  // Parse URL parameters on component mount and perform the initial search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("query") || "popular";
    const initialSearchType = params.get("type") || "subject";
    const initialPage = parseInt(params.get("page"), 20) || 1;

    setQuery(initialQuery);
    setSearchType(initialSearchType);
    setPage(initialPage);

    handleSearch(initialQuery, initialSearchType, initialPage);
  }, [location.search, handleSearch]);

  // Page change handler that utilizes the memoized handleSearch function
  const handlePageChange = (newPage) => {
    handleSearch(query, searchType, newPage);
  };

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-4 sm:space-y-8 text-sm sm:text-base max-w-6xl relative">
      {/* Fullscreen Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg font-semibold">Loading...</div>
        </div>
      )}

      <Title />
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        onSearch={(query, type) => handleSearch(query, type, 1)}
      />
      <ResultsList results={results} />

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 bg-highlight text-textPrimary rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 bg-highlight text-textPrimary rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
