const moviePosterHolder =
  "https://source.unsplash.com/collection/1736993/500x650";

function getMoviePoster(posterURI) {
  return `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
}
module.exports = {
  moviePosterHolder,
  getMoviePoster
};
