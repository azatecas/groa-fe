import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TileBar } from "./TileBar";
import ReactLoading from "react-loading";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
//styling for Landing Movie Slider Component
const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: `"Work Sans", sans-serif`,
  },
  btnCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: ".5s",
    position: "relative",
    ["@media (max-width:500px)"]: {
      width: "100%",
    },
  },
  recBtn: {
    fontFamily: `"Work Sans", sans-serif`,
    margin: "10px 0",
    width: "300px",
    height: "5vh",
    fontSize: "18px",
    color: "black",
    backgroundColor: "rgba(65, 236, 176, 1)",
    borderRadius: "20px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transitionDuration: ".2s",
    fontWeight: "900",
  },
  actionBtn: {
    fontFamily: `"Work Sans", sans-serif`,
    margin: "10px 0",
    width: "300px",
    height: "5vh",
    fontSize: "18px",
    color: "black",
    backgroundColor: "gold",
    borderRadius: "20px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transitionDuration: ".2s",
    fontWeight: "900",
    ["@media (max-width:800px)"]: {
      width: "100%",
      margin: "2vh auto",
    },
  },
  btnClose: {
    fontFamily: `"Work Sans", sans-serif`,
    position: "absolute",
    right: "0",
    margin: "auto",
    width: "10%",
    height: "5vh",
    fontSize: "18px",
    color: "white",
    backgroundColor: "red",
    borderRadius: "20px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transitionDuration: ".5s",
    ["@media (max-width:800px)"]: {
      width: "15%",
      fontSize: "12px",
    },
  },
  recMovies: {
    backgroundColor: "rgba(125, 125, 125, 1)",
  },
  loading: {
    margin: "auto",
  },
}));

const LandingMovieSlider = ({ moviesRated, moviesRec, heading }) => {
  const [getRec, setGetRec] = useState(false);
  const styles = useStyles();

  const toggleRec = () => {
    setGetRec(!getRec);
  };

  return (
    <section className={styles.container}>
      <h3> {heading} </h3>

      {moviesRated.length > 1 ? (
        <>
          <TileBar movies={moviesRated} />
          <div className={styles.btnCont}>
            <div>
              {!getRec ? (
                <div className={styles.recBtn} onClick={toggleRec}>
                  Show Recommendations
                </div>
              ) : (
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <div className={styles.actionBtn}>Get Your Own</div>
                </Link>
              )}
            </div>
            {getRec ? (
              <div className={styles.btnClose} onClick={toggleRec}>
                X Close
              </div>
            ) : null}
          </div>

          {getRec ? (
            <div className={styles.recMovies}>
              <TileBar movies={moviesRec} />
            </div>
          ) : null}
        </>
      ) : (
        <ReactLoading
          className={styles.loading}
          type={"spinningBubbles"}
          color={"#00E6BC"}
          height={"150px"}
          width={"150px"}
        />
      )}
    </section>
  );
};

export default LandingMovieSlider;
