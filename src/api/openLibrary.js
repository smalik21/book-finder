export const fetchBooks = async (query, searchType, page = 1, limit = 10) => {
  let url = `https://openlibrary.org/search.json?limit=${limit}&page=${page}&`;

  if (searchType === "title") {
    url += `title=${query}`;
  } else if (searchType === "author") {
    url += `author=${query}`;
  } else if (searchType === "subject") {
    url += `subject=${query}`;
  }

  const response = await fetch(url);
  return await response.json();
};

export const fetchPopularBooks = async (subject = "popular") => {
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject}.json`
  );
  const data = await response.json();
  return data.works;
};

export const fetchBookDetails = async (work_id) => {
  const response = await fetch(`https://openlibrary.org${work_id}.json`);
  return await response.json();
};
