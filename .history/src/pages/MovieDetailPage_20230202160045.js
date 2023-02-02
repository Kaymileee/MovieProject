import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import { apiKey, fetcher, tmvdbImg } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [credit, setCredit] = useState([]);

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
    fetcher
  );

  useEffect(() => {
    async function getCredit() {
      const respone = await fetch(`
      https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`);
      const credit = await respone.json();
      const cast = await credit.cast;
      setCredit(cast);
    }
    getCredit();
  }, []);
  if (!data) return null;
  const casts = credit.slice(0, 5) || [];
  const { backdrop_path, poster_path, original_title, genres, overview, id } =
    data;

  return (
    <div className="pb-10 page-container">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              backdrop_path || poster_path
            })`,
          }}
        ></div>
      </div>
      <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmvdbImg.getOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-10 text-3xl font-semibold text-left text-primary">
          {original_title}
        </h1>
        {genres.length > 0 && (
          <div className="flex items-center mb-10 gap-x-5">
            {genres.map((gen) => (
              <span
                key={gen.id}
                className="px-2 py-1 font-medium text-white border rounded-md border-primary"
              >
                {gen.name}
              </span>
            ))}
          </div>
        )}
        <div className="overview max-w-[800px] text-slate-500 w-full ">
          <p className="text-xl font-normal text-center ">{overview}</p>
        </div>
        <div>
          <h3 className="my-10 text-3xl font-semibold text-center text-white">
            Casts
          </h3>
          <MovieCast></MovieCast>
        </div>
        <div className="w-full videos page-container">
          <MovieVideo></MovieVideo>
          <SimilarMovies></SimilarMovies>
        </div>
      </div>
    </div>
  );
};

const MovieCast = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `
    https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  return (
    <div className="flex gap-x-5">
      {cast &&
        cast.slice(0, 5).map((item) => (
          <div
            className="relative max-w-[300px] rounded-lg overflow-hidden "
            key={item.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
            <h4 className="absolute bottom-0 w-full p-4 font-medium text-center text-white left-2/4 -translate-x-2/4 bg-primary">
              {item.name}
            </h4>
          </div>
        ))}
    </div>
  );
};
const MovieVideo = () => {
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/jTmAkIFeaOw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  const { movieId } = useParams();
  const { data } = useSWR(
    `
    https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  const videos = data.results;
  return (
    <div className="flex flex-col items-center justify-between py-10 ">
      {videos &&
        videos.slice(0, 3).map((item) => (
          <div key={item.id} className="w-full aspect-video mb-5 h-[500px]">
            <div>
              <h3 className="inline-block p-4 mb-5 text-xl font-medium text-white bg-primary">
                {item.name}
              </h3>
            </div>

            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                width="864"
                height="600"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="object-cover w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
    </div>
  );
};
const SimilarMovies = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `
    https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  return (
    <div className="py-10 ">
      <h3 className="text-3xl font-semibold text-primary">Similar movies</h3>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailPage;
