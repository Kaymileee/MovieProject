import React, { useEffect, useState } from "react";
import MovieList from "../components/movies/MovieList";
import { apiKey, fetcher } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=batman&page=1&include_adult=false
const MoviesPage = () => {
  const pageCount = 10;

  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=478858b8788a997ca852637e72f7b601&language=en-US&page=${nextPage}`
  );
  const { data, error, isLoading } = useSWR(url, fetcher);
  const movies = data?.results || [];
  const queryDebounce = useDebounce(query, 500);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const loading = !data && !error;
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
  const { page, total_pages } = data;
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
      <div className="flex justify-center items-center text-primary gap-x-4 ">
        <span
          className="cursor-pointer "
          onClick={() => setNextPage(nextPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            className="px-4 py-2 rounded-lg bg-slate-700 text-primary font-semibold cursor-pointer"
            key={index}
            onClick={() => {
              setNextPage(index + 1);
            }}
          >
            {index + 1}
          </span>
        ))}

        <span
          className="cursor-pointer "
          onClick={() => setNextPage(nextPage + 1)}
        >
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
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviesPage;
