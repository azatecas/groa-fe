import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../store/actions";
import { Link } from "react-router-dom";
//img
import OnboardingImg from "../../img/happy-running-person.png";
//material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    display: "flex",
    background: "#212120",
    padding: "2%",
    fontFamily: 'Work Sans',
  },
  onboardingPlateformImg: {
    width: "30%",
    padding: "3%",
  },
  onboardingText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "3%",
    color:'white',
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
      // width:'100%',
    },
    onboardingText:{
      // justifyContent:'center',
      // width:'90%',
    },
    onboardingPlateformImg: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "40%",
    },
  },
}));

function OnboardingPlatform({ userid }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.onboardingPlateformImg}
        src={OnboardingImg}
        alt="onboarding girl jumping"
      />
      <div className={classes.onboardingText}>
        <h1 className={classes.onboardingh1}>You're Almost There.</h1>
        <p className={classes.onboardingp1}>
          Help Groa personalize your recommendations! Groa works better when you
          tell us what you like.
        </p>
        <p className={classes.onboardingp2}>
          Rate six movies on a scale from 1 to 5 and we’ll get you your
          personalized recommendations in no time! Train Groa to be your
          personal movie AI!
        </p>
        <Link className={classes.onboardingLink} to={`/${userid}/Onboarding`}>
          <Button className={classes.onboardingBut}>Let's Start!</Button>
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
  setFilter,
})(OnboardingPlatform);
