import React, { useEffect } from "react";
// tools
import { connect } from "react-redux";
import { getWatchlistAction, setFilter } from "../../store/actions/index.js";
// Screen width util
import widthFinder from "../../utils/widthFinder.js";

// children components
import LoadingScreen from "../layout/LoadingScreen.js";
import MovieCard from "../movies/MovieCard.js";

//for grid
import { GridList } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

const useStyles = makeStyles((theme) => ({
  Title: {
    fontSize: "3rem",
    textAlign: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  movieCard: {
    "&:hover": {
      transform: "scale(1.1)",
      transitionDuration: ".5s",
    },
  },
  [theme.breakpoints.down("xs")]: {
    Title: {
      fontSize: "2rem",
    },
  },
}));
function Watchlist({
  userid,
  isFetching,
  isDeleting,
  watchlist,
  getWatchlistAction,
  searchTerm,
  setFilter,
}) {
  //OKTA AUTH
  const { authState } = useOktaAuth();
  const { accessToken } = authState;

  //for matieral-ui
  const styles = useStyles();
  const screenWidth = widthFinder(window.innerWidth);

  useEffect(() => {
    setFilter("");
    // Returns the users watchlist from the database
    getWatchlistAction(userid, accessToken);
  }, [getWatchlistAction, userid, isDeleting, setFilter, accessToken]);

  if (isFetching) return <LoadingScreen />;
  else
    return (
      <>
        <h1 className={styles.Title}>My Watchlist</h1>
        <GridList
          className={styles.cardGrid}
          cols={screenWidth ? 2 : 5}
          cellHeight="auto"
        >
          {watchlist
            .filter((movie) =>
              searchTerm !== ""
                ? movie.primary_title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                : true
            )
            .map((movie, index) => {
              let posterURI = movie.poster_url;
              let unsplashUrl =
                "https://source.unsplash.com/collection/1736993/500x650";
              let moviePoster = `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
              return (
                <div className={styles.movieCard} key={index}>
                  <MovieCard
                    key={index}
                    name={movie.primary_title}
                    year={movie.start_year}
                    trailer={movie.trailer_url}
                    description={movie.description}
                    genres={movie.genres}
                    movie_id={movie.movie_id}
                    page="watchlist"
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
          ;
        </GridList>
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    isFetching: state.watchlist.isFetching,
    watchlist: state.watchlist.movies,
    watchlistError: state.watchlist.error,
    searchTerm: state.filter.searchTerm,
  };
};
export default connect(mapStateToProps, {
  getWatchlistAction,
  setFilter,
})(Watchlist);
