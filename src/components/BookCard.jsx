import { useState } from "react";
import BookDetailsModal from "./BookDetailsModal";
import PropTypes from "prop-types";
import imageNotAvailable from "../assets/image-not-available.jpg";

BookCard.propTypes = {
  book: PropTypes.shape({
    cover_i: PropTypes.number,
    title: PropTypes.string.isRequired,
    author_name: PropTypes.arrayOf(PropTypes.string),
    key: PropTypes.string.isRequired,
    publisher: PropTypes.arrayOf(PropTypes.string),
    first_publish_year: PropTypes.number,
  }).isRequired,
};

export default function BookCard({ book }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : imageNotAvailable;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group p-2 sm:p-4 rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 bg-secondary"
      >
        <div className="relative w-full h-full">
          <img
            src={imageError ? imageNotAvailable : imageUrl}
            alt={`${book.title} cover`}
            loading="lazy"
            className="w-full min-h-48 h-4/5 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-95"
            onError={handleImageError}
          />
          <div className="h-1/5">
            <h3 className="font-semibold sm:text-xl mt-2 truncate text-highlight">
              {book.title}
            </h3>
            <p className="text-textPrimary font-normal opacity-70 truncate">
              {book.author_name?.join(", ")}
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BookDetailsModal
          title={book.title}
          authors={book.author_name}
          publisher={book.publisher?.[0] || "Unknown Publisher"}
          publishYear={book.first_publish_year}
          coverImage={imageError ? imageNotAvailable : imageUrl}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
