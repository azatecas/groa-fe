import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import {
  loginAction,
  setFilter,
  recommendationAction,
} from "../../store/actions";

// Banner img import
import Banner from "../../img/groa_banner.png";
import GroaLogo from "../../img/groa-logo-nav.png";

import { Collapse, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import MenuIcon from "@material-ui/icons/Menu";
import { Toolbar, Typography, MenuItem, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Search Bar Component
import SearchBar from "../auth/SearchBar.js";

const useStyles = makeStyles((theme) => ({
  logout: {
    color: "white",
  },
  //for nav bar
  toolBar: {
    backgroundColor: "#0B0B0B",
    display: "flex",
    justifyContent: "space-between",
    "& a:hover": {
      color: "#07E6BC",
    },
  },
  groaLogo: {
    height: "2rem",
    width: "auto",
  },
  Banner: {
    width: "100%",
    height: "50vh",
    borderBottom: "1px solid black",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    padding: ".2rem 0",
    justifyContent: "space-around",
    width: "100%",
    "& a": {
      fontSize: "1rem",
      textDecoration: "None",
      color: "white",
    },
    "& a:hover": {
      borderBottom: "1px solid #07E6BC",
    },
  },
  navs: {
    display: "flex",
    flexDirection: "column",
    padding: ".5rem 0",
    marginTop: "-5px",
    background: "#020C14",
  },
  toggler: {
    color: "white",
  },
  [theme.breakpoints.down("xs")]: {
    groaLogo: {
      flex: "display",
      justifyContent: "center",
    },
    navs: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    navbar: {
      flexDirection: "column",
      margin: "1rem 0",
    },
  },
}));

const BannerNav = ({ userid, search }) => {
  const classes = useStyles();
  const { authState, authService } = useOktaAuth();
  const logout = async () => authService.logout("/");

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
      <div id="stickyNav" className={classes.navs}>
        <Navbar expand="md">
          <button
            aria-label="Toggle navigation"
            type="button"
            class="navbar-toggler"
            onClick={toggle}
          >
            <span class="navbar-toggler-icon">
              <MenuIcon className={classes.toggler} />
            </span>
          </button>
          <Collapse isOpen={isOpen} navbar>
            <Nav className={`mr-auto ${classes.navbar}`} navbar>
              <NavItem>
                <NavLink href={`/${userid}/recommendations`}>
                  Recommendations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`/${userid}/watchlist`}>Watchlist</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`/${userid}/ratings`}>Ratings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`/${userid}/explore`}>Discover</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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
