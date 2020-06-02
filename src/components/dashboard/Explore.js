import React, { useEffect } from "react";
// tools
import { connect } from "react-redux";
import {
  getMoviesAction,
  setFilter,
  notWatchListAction,
} from "../../store/actions/index.js";
// Screen width util
import widthFinder from "../../utils/widthFinder.js";

// children components
import MovieCard from "../movies/MovieCard.js";
import LoadingScreen from "../layout/LoadingScreen.js";
//for grid
import { GridList } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

const useStyles = makeStyles((theme) => ({
  Title: {
    fontSize: "3rem",
    textAlign: "center",
    paddingTop:'2%',
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  movieCard: {
    "&:hover": {
      transform: 'scale(1.1)',
      transitionDuration:'.5s'
    },
  },
  [theme.breakpoints.down("xs")]: {
    Title: {
      fontSize: '2rem'
    },
  },
}));
function Explore({
  isFetching,
  movies,
  userid,
  getMoviesAction,
  searchTerm,
  setFilter,
  ratings,
  queries,
  isSearching,
  notWatchListAction,
}) {
  const classes = useStyles();
  const screenWidth = widthFinder(window.innerWidth);

  const { authState, authService } = useOktaAuth();
  const { accessToken } = authState;

  useEffect(() => {
    setFilter("");
    // Returns the movies
    getMoviesAction(userid, accessToken);
    notWatchListAction(userid, accessToken);
  }, [
    getMoviesAction,
    notWatchListAction,
    userid,
    ratings,
    setFilter,
    accessToken,
  ]);

  // How many movies render
  const cardAmount = 40;

  if (isFetching) return <LoadingScreen />;
  else
    return (
      <>
        <h1 className={classes.Title}>Search Your Favorite Movies</h1>
        {isSearching ? (
          <GridList
            className={classes.cardGrid}
            cols={screenWidth ? 2 : 5}
            cellHeight="auto"
          >
            {" "}
            {queries
              .filter((movie) =>
                !ratings.includes(
                  (film) =>
                    film.title === movie.title && film.year === movie.year
                ).length && searchTerm !== ""
                  ? movie.primary_title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                  : true
              )
              .slice(0, cardAmount)
              .map((movie, index) => {
                console.log('this is the movie ', movie)

                /* Checks if the film is in ratings */
                const isRated = (film) => {
                  return film.title === movie.title && film.year === movie.year;
                };
                /* Returns the movie object if in ratings */
                let rated = ratings.find(isRated);
                let posterURI = movie.poster_url;
                let unsplashUrl =
                  "https://source.unsplash.com/collection/1736993/500x650";
                let moviePoster = `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
                return (
                  <div className={classes.movieCard} key={index}>
                    <MovieCard
                      key={index}
                      page={"Explore"}
                      name={movie.title}
                      year={movie.year}
                      movie_id={movie.movie_id}
                      description={movie.description}
                      trailer={movie.trailer_url}
                      avg_rating={movie.avg_rating}
                      rated={rated ? rated.rating : null}
                      image={
                        !posterURI ||
                          posterURI === "None" ||
                          posterURI === "No poster" ||
                          posterURI === "No Poster" ||
                          posterURI === "Not in table"
                          ? unsplashUrl
                          : moviePoster
                      }
                    />
                  </div>
                );
              })}
          </GridList>
        ) : (
            <GridList
              className={classes.cardGrid}
              cols={screenWidth ? 2 : 5}
              cellHeight="auto"
            >
              {" "}
              {movies
                .filter((movie) =>
                  !ratings.includes(
                    (film) =>
                      film.title === movie.title && film.year === movie.year
                  ).length && searchTerm !== ""
                    ? movie.primary_title
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                    : true
                )
                .slice(0, cardAmount)
                .map((movie, index) => {
                  /* Checks if the film is in ratings */
                  const isRated = (film) => {
                    return film.title === movie.title && film.year === movie.year;
                  };
                  /* Returns the movie object if in ratings */
                  let rated = ratings.find(isRated);
                  let posterURI = movie.poster_url;
                  let unsplashUrl =
                    "https://source.unsplash.com/collection/1736993/500x650";
                  let moviePoster = `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
                  return (
                    <div className={classes.movieCard} key={index}>
                      <MovieCard
                        key={index}
                        page={"Explore"}
                        name={movie.title}
                        year={movie.year}
                        movie_id={movie.movie_id}
                        description={movie.description}
                        trailer={movie.trailer_url}
                        rated={rated ? rated.rating : null}
                        image={
                          !posterURI ||
                            posterURI === "None" ||
                            posterURI === "No poster" ||
                            posterURI === "No Poster" ||
                            posterURI === "Not in table"
                            ? unsplashUrl
                            : moviePoster
                        }
                      />
                    </div>
                  );
                })}
            </GridList>
          )}
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    isFetching: state.movie.isFetching,
    movies: state.movie.movies,
    moviesError: state.movie.error,
    searchTerm: state.filter.searchTerm,
    watchlist: state.watchlist.movies,
    ratings: state.rating.movies,
    queries: state.search.queries,
    isSearching: state.search.isSearching,
  };
};
export default connect(mapStateToProps, {
  getMoviesAction,
  setFilter,
  notWatchListAction,
})(Explore);
