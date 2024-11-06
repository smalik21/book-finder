import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

BookDetailsModal.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  publisher: PropTypes.string,
  publishYear: PropTypes.number,
  coverImage: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default function BookDetailsModal({
  title,
  authors,
  publisher,
  publishYear,
  coverImage,
  onClose,
}) {
  const navigate = useNavigate();

  const handleAuthorClick = (query) => {
    onClose();
    const params = new URLSearchParams({
      query: query,
      type: "author",
      page: "1",
    });
    navigate({ pathname: "/", search: params.toString() });
  };

  // Close the modal on clicking outside the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="relative bg-secondary p-6 sm:p-8 rounded shadow-md max-w-lg w-fit flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-8 border-highlight border-opacity-70">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-lg"
        >
          ✕
        </button>
        {/* Book Cover Image */}
        <img
          src={coverImage}
          alt={`${title} cover`}
          className="w-auto sm:w-2/6 h-auto min-h-40 sm:min-w-40 max-w-40 object-cover rounded shadow-md border-2 border-primary"
        />
        {/* Book Details */}
        <div className="flex h-full flex-col gap-2 text-left w-auto sm:w-4/6">
          <h2 className="text-2xl text-highlight font-bold sm:mb-8">{title}</h2>
          <p>
            <span className="opacity-80">Authors:</span>{" "}
            {authors?.map((author, index) => (
              <span
                key={index}
                onClick={() => handleAuthorClick(author)}
                className="text-highlight cursor-pointer hover:underline"
              >
                {author}
                {index < authors.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>
            <span className="opacity-80">Publisher:</span> {publisher}
          </p>
          <p>
            <span className="opacity-80">First Published:</span> {publishYear}
          </p>
        </div>
      </div>
    </div>
  );
}
