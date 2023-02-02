import { Fragment, lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import MovieCard from "./components/movies/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
// import MoviesPageV2 from "./pages/MoviesPageV2";
// import HomePage from "./pages/HomePage";
// import Main from "./components/layouts/Main";
// import MoviesPage from "./pages/MoviesPage";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import TVPage from "./pages/TVPage";
// import TVDetailPage from "./pages/TVDetailPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const Main = lazy(() => import("./components/layouts/Main"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MoviesPageV2 = lazy(() => import("./pages/MoviesPageV2"));

const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const TVPage = lazy(() => import("./pages/TVPage"));
const TVDetailPage = lazy(() => import("./pages/TVDetailPage"));

function App() {
  return (
    <Fragment>
      {/* <Header></Header>
      <Banner></Banner>
      <HomePage></HomePage> 
      */}
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/movies"
              element={<MoviesPageV2></MoviesPageV2>}
            ></Route>
            <Route path="/tv" element={<TVPage></TVPage>}></Route>

            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/tv/:tvId"
              element={<TVDetailPage></TVDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
