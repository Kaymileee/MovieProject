import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
const Banner = () => {
  // https://api.themoviedb.org/3/genre/movie/list?api_key=478858b8788a997ca852637e72f7b601&language=en-US
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [gen, setGen] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=478858b8788a997ca852637e72f7b601&language=en-US&page=1`,
    fetcher
  );
  useEffect(() => {
    async function getGenres() {
      const gen = await fetcher(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=478858b8788a997ca852637e72f7b601&language=en-US"
      );

      setGen(gen.genres);
    }
    getGenres();
  }, []);

  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results.slice(0, 5));
    }
  }, [data]);
  console.log(movies);
  function getTag(ids) {
    const tagId = gen.filter((item) => Number(item.id) === Number(ids));
    const tag = tagId[0];
    return tag?.name;
  }
  return (
    <section className="banner h-[600px] page-container mb-20">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <div div className="w-full h-full rounded-lg  relative">
                <div
                  className="overplay absolute inset-0 bg-gradient-to-t 
      from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "
                >
                  {" "}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="content absolute left-5 bottom-5 text-white">
                  <h2 className="font-bold text-3xl mb-5">{item.title}</h2>
                  <div className="flex items-center gap-x-3 mb-8">
                    {item.genre_ids.map((ids) => (
                      <span
                        key={ids}
                        className="px-2 py-1 font-medium rounded-md border-white border text-white"
                      >
                        {getTag(ids)}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => navigate(`/movies/${item.id}`)}
                    className="w-auto"
                  >
                    Watch Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
