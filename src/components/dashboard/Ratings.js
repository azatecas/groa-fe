import React, { useEffect } from "react";
import RatingsMovieSlider from "./RatingsMovieSlider.js";
// tools
import { connect } from "react-redux";
import { getRatingAction, setFilter } from "../../store/actions/index.js";

// children components
import LoadingScreen from "../layout/LoadingScreen.js";
//for grid
import { makeStyles } from "@material-ui/core/styles";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

const useStyles = makeStyles((theme) => ({
  RatingsContainer: {
    padding: "2rem",
  },
  Title: {
    fontSize: "3rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("xs")]: {
    Title: {
      fontSize: "2rem",
    },
  },
}));
function Ratings({ userid, isFetching, getRatingAction, ratings, setFilter }) {
  //OKTA AUTH
  const { authState, authService } = useOktaAuth();
  const { accessToken } = authState;
  //for sizing of the movie cards
  const classes = useStyles();
  useEffect(() => {
    setFilter("");
    // Returns the ratings
    getRatingAction(userid, accessToken);
  }, [getRatingAction, userid, setFilter, accessToken]);

  //Seprate Star ratings
  const fiveStars = ratings.filter((movie) => movie.rating === 5);
  const fourHalfStars = ratings.filter((movie) => movie.rating === 4.5);
  const fourStars = ratings.filter((movie) => movie.rating === 4);
  const threeHalfStars = ratings.filter((movie) => movie.rating === 3.5);
  const threeStars = ratings.filter((movie) => movie.rating === 3);
  const twoHalfStars = ratings.filter((movie) => movie.rating === 2.5);
  const twoStars = ratings.filter((movie) => movie.rating === 2);
  const oneHalfStars = ratings.filter((movie) => movie.rating === 1.5);
  const oneStars = ratings.filter((movie) => movie.rating === 1);

  if (isFetching) return <LoadingScreen />;
  else
    return (
      <>
        <h1 className={classes.Title}>My Ratings</h1>
        <div className={classes.RatingsContainer}>
          <RatingsMovieSlider movieRatings={fiveStars} heading={"5 Star"} />
          <RatingsMovieSlider
            movieRatings={fourHalfStars}
            heading={"4.5 Star"}
          />
          <RatingsMovieSlider movieRatings={fourStars} heading={"4 Star"} />
          <RatingsMovieSlider
            movieRatings={threeHalfStars}
            heading={"3.5 Star"}
          />
          <RatingsMovieSlider movieRatings={threeStars} heading={"3 Star"} />
          <RatingsMovieSlider
            movieRatings={twoHalfStars}
            heading={"2.5 Star"}
          />
          <RatingsMovieSlider movieRatings={twoStars} heading={"2 Star"} />
          <RatingsMovieSlider
            movieRatings={oneHalfStars}
            heading={"1.5 Star"}
          />
          <RatingsMovieSlider movieRatings={oneStars} heading={"1 Star"} />
        </div>
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    isFetching: state.rating.isFetching,
    ratings: state.rating.movies,
    ratingsError: state.rating.error,
  };
};
export default connect(mapStateToProps, { getRatingAction, setFilter })(
  Ratings
);
