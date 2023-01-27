import React, { useEffect, useState } from "react";
import MovieList from "../components/movies/MovieList";
import { apiKey, fetcher } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";

const MoviesPageV2 = () => {
  const pageCount = 10;

  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=478858b8788a997ca852637e72f7b601&language=en-US&page=${nextPage}`
  );
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];

  const queryDebounce = useDebounce(query, 500);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  // const { page, total_pages } = data;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < pageCount);
  useEffect(() => {
    if (queryDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${queryDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=478858b8788a997ca852637e72f7b601&page=${nextPage}`
      );
    }
  }, [nextPage, queryDebounce]);
  if (!data) return null;
  return (
    <div className="py-10   page-container">
      <div className="flex relative">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 outline-none border-0 rounded-lg bg-slate-800 text-white shadow-2xl"
            placeholder="Type here ..."
            onChange={handleChange}
          />
        </div>
        <button className="absolute right-0 top-[50%] -translate-y-[50%] bg-primary font-semibold h-full w-[50px] flex justify-center items-center rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin my-5"></div>
      )}
      {!loading && (
        <div className="gap-5 grid grid-cols-4 my-5">
          {movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard key={movie.id} item={movie}></MovieCard>
            ))}
        </div>
      )}
      <Button
        className={`w-auto text-center mx-auto block ${
          isReachingEnd ? "cursor-none" : ""
        }`}
        onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
        disabled={isReachingEnd}
      >
        Load More
      </Button>
    </div>
  );
};

export default MoviesPageV2;
