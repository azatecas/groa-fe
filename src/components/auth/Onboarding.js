import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getMoviesAction,
  getRatingAction,
  setFilter,
} from "../../store/actions/index.js";
// Screen width util
import widthFinder from "../../utils/widthFinder.js";
// children components
import MovieCard from "../movies/MovieCard.js";
import LoadingScreen from "../layout/LoadingScreen.js";
//for grid
import { GridList } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

//testing snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//okta
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  Title: {
    fontFamily: 'Work Sans',
    fontSize: "2rem",
    textAlign: "center",
    color:'white',
    paddingTop:'2%',
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Onboarding({
  isFetching,
  movies,
  userid,
  getMoviesAction,
  searchTerm,
  setFilter,
  ratings,
  queries,
  isSearching,
}) {
  // console.log("movies", movies);
  const classes = useStyles();
  //for okta
  const { authState } = useOktaAuth();
  const { accessToken } = authState;

  const [openAlert, setOpenAlert] = useState(false);
  let [numRatings, setNumRatings] = useState({ num: 0 });
  const screenWidth = widthFinder(window.innerWidth);

  const handleClickStar = () => {
    setOpenAlert(true);
  };
  const handleCloseStar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    setFilter("");
    // Returns the movies
    getMoviesAction(userid, accessToken);
  }, [getMoviesAction, userid, ratings, setFilter, accessToken]);
  // How many movies render
  const cardAmount = 25;

  if (isFetching) return <LoadingScreen />;
  else if (numRatings.num >= 13) return <Redirect to="postonboarding" />;
  else
    return (
      <>
     <h1 className={classes.Title}> Rate Movies to Get Personalized Recommendations </h1>
      <div>
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
                    film.film.title === movie.title && film.year === movie.year
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
                      name={movie.title}
                      page={"Onboarding"}
                      movie_id={movie.movie_id}
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
                      handleClickStar={handleClickStar}
                      numRatings={numRatings}
                      setNumRatings={setNumRatings}
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
                    film.film.title === movie.title && film.year === movie.year
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
                      name={movie.title}
                      page={"Onboarding"}
                      movie_id={movie.movie_id}
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
                      handleClickStar={handleClickStar}
                      numRatings={numRatings}
                      setNumRatings={setNumRatings}
                    />
                  </div>
                );
              })}
          </GridList>
        )}
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleCloseStar}
        >
          <Alert onClose={handleCloseStar} variant="filled" severity="success">
            You have successfully rated this movie!
          </Alert>
        </Snackbar>
      </div>
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
    ratingsError: state.rating.error,
    queries: state.search.queries,
    isSearching: state.search.isSearching,
  };
};
export default connect(mapStateToProps, {
  getMoviesAction,
  setFilter,
  getRatingAction,
})(Onboarding);
