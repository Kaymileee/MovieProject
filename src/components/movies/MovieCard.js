import React from "react";
import { useNavigate } from "react-router-dom";
import { tmvdbImg } from "../../config";
import Button from "../button/Button";
import LoadingSkeleton from "./LoadingSkeleton";

const MovieCard = ({ item, option = "movies" }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex  flex-col justify-between select-none">
      <img
        src={tmvdbImg.getW500(item?.poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <h3 className=" text-xl mb-3 font-bold">{item?.title || item?.name}</h3>
      <div className="flex items-center justify-between mb-10  text-sm opacity-50">
        <span>
          {new Date(item?.release_date).getFullYear() ||
            new Date(item?.first_air_date).getFullYear()}
        </span>
        <span>{item?.vote_average}</span>
      </div>
      <Button
        onClick={() => {
          navigate(`/${option}/${item.id}`);
        }}
      >
        Watch Now
      </Button>
    </div>
  );
};
export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex  flex-col justify-between select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        borderRadius="8px"
      ></LoadingSkeleton>
      <h3 className=" text-xl mb-3 font-bold">
        <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
      </h3>
      <div className="flex items-center justify-between mb-10  text-sm opacity-50">
        <span>
          <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
        </span>
        <span>
          {" "}
          <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
        </span>
      </div>

      <LoadingSkeleton
        width="100%"
        height="45px"
        borderRadius="8px"
      ></LoadingSkeleton>
    </div>
  );
};
export default MovieCard;
