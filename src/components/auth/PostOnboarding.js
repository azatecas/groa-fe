import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getMoviesAction,
  setFilter,
  recommendationAction,
} from "../../store/actions";
import { Link } from "react-router-dom";
//img
import PostOnboardingImg from "../../img/post-onboarding-man.png";
//material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
//okta
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#212120",
    padding: "2%",
    fontFamily: 'Work Sans',
  },
  PostOnboardingImg: {
    width: "45%",
    padding: "3%",
  },
  onboardingText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "3%",
    color: "#FFFFFF",
  },
  onboardingh1: {
    fontSize: "35px",
    padding: "2%",
  },
  onboardingp1: {
    color: "#00E6BC",
    padding: "2%",
    fontSize: "20px",
  },
  onboardingp2: {
    padding: "2%",
    fontSize: "20px",
  },
  onboardingLink: {
    textAlign: "center",
    // fontSize: "25px",
    padding: "2%",
    textDecoration:'none',
  },
  onboardingBut: {
    width: "100%",
    height:'7vh',
    background: '#00B392',
    color: '#212120',
    borderRadius: "4px",
    '&:hover': {
      boxShadow: '0 0 6px #00B392',
      color: '#00B392',
    },
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      flexDirection: "column-reverse",
      textAlign:'center',
    },
    PostOnboardingImg: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
    },
  },
}));

function PostOnboarding({
  userid,
  recommendationAction,
  getMoviesAction,
  setFilter,
  ratings,
}) {
  const classes = useStyles();
  //for okta
  const { authState } = useOktaAuth();
  const { accessToken } = authState;
  //to obtain recommendations from onboarding questionaire
  useEffect(() => {
    setFilter("");
    // Returns the movies
    getMoviesAction(userid, accessToken);
    // returns a list of recommendations to start the recommendations page
    recommendationAction(userid, accessToken);
  }, [
    getMoviesAction,
    userid,
    ratings,
    setFilter,
    recommendationAction,
    accessToken,
  ]);

  return (
    <div className={classes.root}>
      <img
        className={classes.PostOnboardingImg}
        src={PostOnboardingImg}
        alt="onboarding boy jumping"
      />
      <div className={classes.onboardingText}>
        <h1 className={classes.onboardingh1}> Great Job!</h1>
        <p className={classes.onboardingp1}>You've come so far!</p>
        <p className={classes.onboardingp2}>
          Check out your personalized Groa recommendations
        </p>
        <Link
          className={classes.onboardingLink}
          to={`/${userid}/recommendations`}
        >
          <Button className={classes.onboardingBut}>View Your Recommended Movies</Button>
        </Link>
      </div>
    </div>
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
  };
};
export default connect(mapStateToProps, {
  getMoviesAction,
  recommendationAction,
  setFilter,
})(PostOnboarding);
