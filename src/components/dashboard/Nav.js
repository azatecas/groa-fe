import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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

const Nav = ({ userid }) => {
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  return (
    <div>
      <nav className={classes.navbar}>
        <a href={`/${userid}/recommendations`}>Recommendation</a>
        <a href={`/${userid}/watchlist`}>Watchlist</a>
        <a href={`/${userid}/ratings`}>Ratings</a>
        <a href={`/${userid}/explore`}>Explore</a>
      </nav>
    </div>
  );
};

export default Nav;
