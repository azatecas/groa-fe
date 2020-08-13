import React from "react";
import Nav from "./Nav.js";
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
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem",
    justifyContent: "space-around",
    background: "#121211",
    marginTop: "-5px",
    "& a": {
      fontSize: "1rem",
      textDecoration: "None",
      color: "white",
    },
    "& a:hover": {
      color: "#07E6BC",
    },
  },
}));

const BannerNav = ({ userid, search }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { authState, authService } = useOktaAuth();

  const logout = async () => authService.logout("/");

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
      <img className={classes.Banner} src={Banner} alt="Groa Banner" />
      <div>
        <Nav userid={userid} />
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
