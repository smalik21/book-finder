import { useNavigate } from "react-router-dom";

export default function Title() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    // Define default search parameters
    const params = new URLSearchParams({
      query: "popular",
      type: "subject",
      page: "1",
    });
    navigate({ pathname: "/", search: params.toString() });
  };

  return (
    <h1
      onClick={goToHomePage}
      className="text-center text-xl sm:text-3xl font-bold cursor-pointer text-highlight hover:text-textPrimary transition-colors"
    >
      My Book Library
    </h1>
  );
}
