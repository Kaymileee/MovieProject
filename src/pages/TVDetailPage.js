import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  apiKey,
  fetcher,
  tmdbApiTVshows,
  tmvdbImg,
  updateName,
} from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movies/MovieCard";
import Button from "../components/button/Button";

const TVDetailPage = () => {
  const navigate = useNavigate();
  const { tvId } = useParams();
  const { data } = useSWR(tmdbApiTVshows.getDetail(tvId), fetcher);
  if (!data) return;

  const {
    genres,
    name,
    backdrop_path,
    poster_path,
    vote_average,
    vote_count,
    overview,
  } = data;
  const updateName = (temp = "", name = "") => {
    const transArr = temp.split(" ");
    const getCharacter = transArr.find((text) => text === name);

    if (getCharacter === undefined) {
      return transArr[0];
    }
    return getCharacter;
  };
  return (
    <>
      <div className="relative page-container py-20 overflow-hidden rounded-lg">
        <div
          className="banner  h-[500px]  w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${tmvdbImg.getOriginal(
              backdrop_path || poster_path
            )})`,
          }}
        ></div>
        <div className="inset-0 absolute bg-black bg-opacity-70"></div>

        <div className="vote absolute left-5 bottom-5 flex justify-center items-center gap-x-5">
          <div className="text-white rounded-full w-[60px] h-[60px]  border-[5px] border-primary flex items-center justify-center border-r-transparent">
            {vote_average}
          </div>
          <div className="">
            <h3 className="text-white font-semibold text-2xl">
              {vote_count} Votes
            </h3>
            <h5 className="text-slate-700 font-medium">{data.status}</h5>
          </div>
        </div>
      </div>
      <div className="page-container my-10">
        <div>
          <h1 className="text-primary text-3xl font-bold mb-5">{data.name}</h1>
          {genres && genres.length > 0 && (
            <div className="flex items-center gap-x-5 mb-10">
              {genres.map((gen) => (
                <span
                  key={gen.id}
                  className="px-2 py-1 font-medium rounded-md border-primary border text-white"
                >
                  {gen.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-start gap-x-5">
          <div className=" flex-1">
            <div className="overview mb-10">
              <h3 className="text-primary text-2xl font-medium mb-5">
                StoryLine
              </h3>
              <span className="text-primary mr-1">
                {updateName(overview, name)}
              </span>
              <span className="text-slate-500 font-medium">
                {overview.split(" ").slice(1).join(" ")}
              </span>
            </div>
            <div className="video">
              <h3 className="text-primary text-2xl font-medium mb-5">Videos</h3>
              <TVVideos tvId={tvId}></TVVideos>
            </div>
          </div>
          <div className="cast flex-2">
            <h3 className="text-primary text-2xl font-medium mb-5">Casts</h3>
            <TVCasts tvId={tvId}></TVCasts>
          </div>
        </div>
        <SimilarTV tvId={tvId}></SimilarTV>
        <Button
          className={"w-auto my-10 bg-purple-500"}
          onClick={() => navigate("/tv")}
        >
          Back
        </Button>
      </div>
    </>
  );
};
const TVCasts = ({ tvId }) => {
  const { data } = useSWR(tmdbApiTVshows.getCast(tvId), fetcher);
  if (!data) return;
  const { cast } = data;

  return (
    <>
      {cast.slice(0, 5).map((c) => (
        <div key={c.id} className="flex">
          <div className="cast-img w-[100px] h-[100px] mb-10">
            <img
              src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`}
              alt={c.name}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h4 className="text-white font-medium">{c.character}</h4>
            <h4 className="text-primary font-bold">{c.original_name}</h4>
          </div>
        </div>
      ))}
    </>
  );
};
const TVVideos = ({ tvId }) => {
  const { data } = useSWR(tmdbApiTVshows.getVideo(tvId), fetcher);
  if (!data) return;
  const { results } = data;
  return (
    <>
      <div>
        {results.slice(0, 2).map((vd) => (
          <div key={vd.id} className="mb-10  ">
            <div className="rounded-lg  text-white font-medium max-w-max py-5 ">
              {vd.name}
            </div>
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                width="864"
                height="600"
                src={`https://www.youtube.com/embed/${vd.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
const SimilarTV = ({ tvId }) => {
  const { data } = useSWR(tmdbApiTVshows.getSimilar(tvId), fetcher);
  if (!data) return;
  const { results } = data;
  return (
    <div className="py-10 ">
      {results.length > 0 && (
        <>
          {" "}
          <h3 className="text-3xl font-semibold text-primary">
            Similar movies
          </h3>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item} option="tv"></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};
export default TVDetailPage;
