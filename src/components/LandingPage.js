import React, { useEffect } from "react";
//redux
import { connect } from "react-redux";
import {
  horrorLandingAction,
  comedyLandingAction,
  dramaLandingAction,
  romanceLandingAction,
  staffLandingAction,
  loginAction,
} from "../store/actions/index.js";

import Copyright from "./Copyright.js";
import LandingMovieSlider from "./LandingMovieSlider";
import { Link, useHistory } from "react-router-dom";
import LandingNavLinks from "./layout/nav-layouts/LandingNavLinks";
import { makeStyles } from "@material-ui/core";
import headerImg from "../img/watching-tv.png";

import { useOktaAuth } from "@okta/okta-react";

const useStyles = makeStyles((theme) => ({
  onboardingNav: {
    color: "white",
    display: "flex",
    width: "95%",
    margin: "0 auto",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "1.1% 1%",
    textAlign: "center",
    fontSize: "1rem",
  },
  testDiv: {
    margin: "auto",
    width: "80%",
    minHeight: "90vh",
    color: "white",
  },
  jumbotron: {
    height: "90vh",
    display: "flex",
    flexDirection: "row",
    "& div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& img": {
      width: "100%",
    },
  },
  title: {
    textAlign: "center",
    width: "50%",
    flexDirection: "column",
    fontFamily: `"Work Sans", sans-serif`,
    "& h1": {
      fontSize: "60px",
    },
    "& button": {
      margin: "3vh auto",
      width: "100%",
      height: "8vh",
      fontSize: "30px",
      color: "black",
      backgroundColor: "gold",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
    },
    "& p": {
      fontSize: "20px",
    },
  },
  recBtn: {
    margin: "auto",
    width: "200px",
    height: "5vh",
    fontSize: "18px",
    color: "black",
    backgroundColor: "gold",
    borderRadius: "20px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    background: "linear-gradient(180deg, #000A12 0%, #545454 94.14%)",
  },
}));

const LandingPage = ({
  //actions destructured from props
  horrorLandingAction,
  comedyLandingAction,
  dramaLandingAction,
  romanceLandingAction,
  staffLandingAction,
  loginAction,
  //state destructured from props
  horrorMovies,
  horrorMoviesRec,
  comedyMovies,
  comedyMoviesRec,
  dramaMovies,
  dramaMoviesRec,
  romanceMovies,
  romanceMoviesRec,
  staffMovies,
  staffMoviesRec,
  isFetching,
}) => {
  const history = useHistory();
  const { authState, authService } = useOktaAuth();
  const login = async () => authService.login("/register");
  const styles = useStyles();

  useEffect(() => {
    //Auth URL redirect from facebook contains #id_token, if exist login() will authenticate the user
    if (window.location.href.indexOf("#id_token") > -1) {
      login();
    }

    if (window.location.href.indexOf("AUTHENTICATED") > -1) {
      login();
    }

    if (authState.isAuthenticated === true) {
      authService
        .getUser()
        .then((info) => {
          loginAction(authState.accessToken, info.sub, history);
          console.log("checking authentication");
        })
        .catch((err) =>
          console.log("Error fetching User info in UseEffect", err)
        );
    }
  }, [authState, authService]);

  useEffect(() => {
    horrorLandingAction();
    comedyLandingAction();
    dramaLandingAction();
    romanceLandingAction();
    staffLandingAction();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.testDiv}>
        <div className={styles.onboardingNav}>
          <LandingNavLinks />
        </div>

        <header className={styles.jumbotron}>
          <div className={styles.title}>
            <h1>Welcome to Gróa</h1>
            <p>The unbiased movie recommendation platform</p>
            <p>for movie fans by movie fans!</p>
            <Link to="/register">
              <button>Get Started</button>
            </Link>
          </div>
          <div>
            <img className={styles.img} src={headerImg} alt="groa" />
          </div>
        </header>
        <LandingMovieSlider
          moviesRated={horrorMovies}
          moviesRec={horrorMoviesRec}
          heading={"Horror"}
        />

        <LandingMovieSlider
          moviesRated={comedyMovies}
          moviesRec={comedyMoviesRec}
          heading={"Comedy"}
        />

        <LandingMovieSlider
          moviesRated={dramaMovies}
          moviesRec={dramaMoviesRec}
          heading={"Drama"}
        />

        <LandingMovieSlider
          moviesRated={romanceMovies}
          moviesRec={romanceMoviesRec}
          heading={"Romance"}
        />
        <LandingMovieSlider
          moviesRated={staffMovies}
          moviesRec={staffMoviesRec}
          heading={"Staff's Favorite Movies"}
        />
      </div>

      <Copyright />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    registerSuccess: state.register.success,
    userid: state.login.userid,
    errorStatus: state.register.error,
    horrorMovies: state.landingPageReducer.horrorMovies,
    horrorMoviesRec: state.landingPageReducer.horrorMoviesRec,
    comedyMovies: state.landingPageReducer.comedyMovies,
    comedyMoviesRec: state.landingPageReducer.comedyMoviesRec,
    dramaMovies: state.landingPageReducer.dramaMovies,
    dramaMoviesRec: state.landingPageReducer.dramaMoviesRec,
    romanceMovies: state.landingPageReducer.romanceMovies,
    romanceMoviesRec: state.landingPageReducer.romanceMoviesRec,
    staffMovies: state.landingPageReducer.staffMovies,
    staffMoviesRec: state.landingPageReducer.staffMoviesRec,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  horrorLandingAction,
  comedyLandingAction,
  dramaLandingAction,
  romanceLandingAction,
  staffLandingAction,
  loginAction,
})(LandingPage);
