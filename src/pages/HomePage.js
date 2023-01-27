import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movies/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Popular
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Up Coming
        </h2>
        <MovieList type="upcoming"></MovieList>
      </section>
    </>
  );
};

export default HomePage;
