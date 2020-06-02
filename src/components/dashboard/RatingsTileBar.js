import React from "react";
import MovieCard from "../movies/MovieCard.js";

// Screen width util
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.9em",
      backgroundColor: "rgba(0, 0, 0, 0.71)",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(65, 236, 176, 1)",
      borderRadius: "10px",
    },
  },
  cont: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    backgroundColor: theme.palette.background.paper,
    height: "400px",
  },
  movieList: {
    minWidth: "15%",
    margin: "10px",
  },
  posterImg: {
    width: "100%",
  },
  customArrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(65, 236, 176, 1)",
    color: "black",
    fontWeight: "900",
    border: "none",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    right: "0",
    padding: "0",
    fontSize: "30px",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      backgroundColor: "rgba(65, 236, 176, .5)",
      color: "white",
      width: "8%",
      height: "100%",
      borderRadius: "50% 0 0 50%",
      fontSize: "40px",
    },
    "&:focus": {
      outline: "none",
    },
  },
  leftArrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(65, 236, 176, 1)",
    color: "black",
    fontWeight: "900",
    border: "none",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    left: "0",
    padding: "0",
    fontSize: "30px",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      backgroundColor: "rgba(65, 236, 176, .5)",
      color: "white",
      width: "8%",
      height: "100%",
      borderRadius: "0 50% 50% 0",
      fontSize: "40px",
    },
    "&:focus": {
      outline: "none",
    },
  },
  movieCard: {
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const RatingsTileBar = ({ movies }) => {
  const styles = useStyles();

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      keyBoardControl={true}
      transitionDuration={200}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-1-px"
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
    >
      {movies.map((movie, index) => {
        let posterURI = movie.poster_url;
        let unsplashUrl =
          "https://source.unsplash.com/collection/1736993/500x650";
        let moviePoster = `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
        return (
          <div key={index} className={styles.movieCard}>
            <MovieCard
              key={index}
              page={"Ratings"}
              name={movie.primary_title}
              movie_id={movie.movie_id}
              year={movie.start_year}
              rated={movie.rating}
              description={movie.description}
              trailer={movie.trailer_url}
              genres={movie.genres}
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
    </Carousel>
  );
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const styles = useStyles();
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <button className={styles.customArrow} onClick={() => onClick()}>
      {" "}
      >{" "}
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const styles = useStyles();
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <button className={styles.leftArrow} onClick={() => onClick()}>
      {" "}
      &#60;{" "}
    </button>
  );
};
