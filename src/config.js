export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "478858b8788a997ca852637e72f7b601";
const endPoint = "https://api.themoviedb.org/3/";
export const tmvdbImg = {
  getOriginal: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  getW500: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};

export const tmdbApiTVshows = {
  getTVs: (page) =>
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`,
  getDetail: (tvId) =>
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US`,
  getCast: (tvId) =>
    `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${apiKey}&language=en-US`,
  getVideo: (tvId) =>
    `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${apiKey}&language=en-US`,
  getSimilar: (tvId) => `
    https://api.themoviedb.org/3/tv/${tvId}/similar?api_key=${apiKey}&language=en-US&page=1`,
};
