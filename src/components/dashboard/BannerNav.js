import React, { useEffect } from "react";

import { connect } from "react-redux";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import {
  loginAction,
  setFilter,
  recommendationAction,
} from "../../store/actions";

// Banner img import
import Banner from "../../img/Banner.png";
import GroaLogo from "../../img/groa-logo-nav.png";

import { Toolbar, Typography, MenuItem, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Search Bar Component
import SearchBar from "../auth/SearchBar.js";

const useStyles = makeStyles((theme) => ({
  logout: {
    color: "white",
  },
  [theme.breakpoints.down("xs")]: {
    groaLogo: {
      flex: "display",
      justifyContent: "center",
    },
  },
  //for nav bar
  toolBar: {
    backgroundColor: "#1c1c1b",
    display: "flex",
    justifyContent: "space-between",
  },
  groaLogo: {
    height: "2rem",
    width: "auto",
  },
  Banner: {
    width: "100%",
    height: "65vh",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem 0",
    justifyContent: "space-around",

    width: "100%",
    "& a": {
      fontSize: "1rem",
      textDecoration: "None",
      color: "white",
    },
    "& a:hover": {
      color: "#07E6BC",
    },
  },
  navs: {
    padding: "1rem 0",
    marginTop: "-5px",
    background: "#121211",
  },
}));

const BannerNav = ({ userid, search }) => {
  const classes = useStyles();
  const { authState, authService } = useOktaAuth();

  const logout = async () => authService.logout("/");

  const handleScroll = (target, nav, banner) => {
    if (window.pageYOffset >= target) {
      nav.classList.add("sticky");
      banner.classList.add("stickyNavBanner");
    } else {
      nav.classList.remove("sticky");
      banner.classList.remove("stickyNavBanner");
    }
  };

  useEffect(() => {
    let navSticky = document.querySelector("#stickyNav");
    let bannerSticky = document.querySelector("#banner");
    let sticky = navSticky.offsetTop;

    console.log(sticky);
    window.onscroll = function () {
      handleScroll(sticky, navSticky, bannerSticky);
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" noWrap>
          <img className={classes.groaLogo} src={GroaLogo} alt="Groa Logo" />
        </Typography>
        <MenuItem
          onClick={logout}
          button
          component="a"
          className={classes.logout}
        >
          Logout
        </MenuItem>
      </Toolbar>
      <img
        id="banner"
        className={classes.Banner}
        src={Banner}
        alt="Groa Banner"
      />
      <div id="stickyNav" className={classes.navs}>
        <nav className={classes.navbar}>
          <a href={`/${userid}/recommendations`}>Recommendation</a>
          <a href={`/${userid}/watchlist`}>Watchlist</a>
          <a href={`/${userid}/ratings`}>Ratings</a>
          <a href={`/${userid}/explore`}>Explore</a>
        </nav>
        {search ? <SearchBar /> : <></>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    searchTerm: state.filter.searchTerm,
    search: state.movie.search,
  };
};

export default connect(mapStateToProps, {
  loginAction,
  recommendationAction,
  setFilter,
})(BannerNav);
