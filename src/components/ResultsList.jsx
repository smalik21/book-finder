import PropTypes from "prop-types";
import BookCard from "./BookCard";

ResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      cover_i: PropTypes.number,
      title: PropTypes.string.isRequired,
      author_name: PropTypes.arrayOf(PropTypes.string),
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function ResultsList({ results }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {results.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}
