import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth.js";
import axios from "axios";
import { connect } from "react-redux";
import {
  ratingAction,
  addToWatchlistAction,
  notWatchListAction,
  removeWatchListAction,
  removeRatingAction,
} from "../../store/actions";

import Stars from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
//for grid
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Link,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

//menu expander
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//Shortcut Links Pictures
import Netflix from "../../img/netflix.png";
import Amazon from "../../img/amazon.png";
import Hulu from "../../img/hulu_trans.png";
import DPlus from "../../img/dplus.png";
import Prime from "../../img/prime.png";

const styles = (theme) => ({
  closeBtn: {
    display: "flex",
    justifyContent: "space-between",
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <div className={classes.closeBtn}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  nameModal: {
    fontSize: "25px",
    textAlign: "center",
  },
  cardContent: {
    height: "100%",
  },
  movieImg: {
    width: "100%",
    height: "450px",
    borderRadius: "5px",
  },
  name: {
    fontSize: "15px",
    textAlign: "center",
    color: "#00B392",
    paddingTop: "1%",
  },
  descriptionModal: {
    color: "white",
    fontSize: "15px",
  },
  span: {
    fontWeight: "bold",
  },
  control: {
    padding: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "450px",
    padding: "1%",
    margin: ".5rem 0",
  },
  cardActions: {
    fontSize: "10px",
    padding: 0,
  },
  stars: {
    fontSize: "2.5vw",
    alignContent: "center",
  },
  text: {
    color: "white",
    fontSize: "16px",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .2s, visibility .2s",
    "&:hover": {
      opacity: 5,
    },
  },
  movieImgModal: {
    opacity: 1,
    display: "block",
    backfaceVisibility: "hidden",
    borderRadius: "11px",
    margin: "auto",
    paddingBottom: "1%",
    width: "40%",
  },
  watchList: {
    justifyContent: "center",
    display: "flex",
  },
  //modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    background: "rgb(23, 23, 23, .96)",
    margin: "auto",
    width: "55rem",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 6, 3),
    color: "white",
    overflowY: "scroll",
  },
  DeleteMoviefromWatch: {
    backgroundColor: "white",
    cursor: "pointer",
  },
  movieInfoModal: {
    display: "flex",
  },
  movieContentDiv: {
    margin: "auto",
  },
  yearGenreModal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2% 0",
  },
  year: {
    fontSize: "18px",
  },
  genresModal: {
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
  },
  rateGenreModal: {
    display: "flex",
  },
  imdbImg: {
    height: "40%",
  },
  avgRatingModal: {
    fontSize: "1rem",
    paddingLeft: "3%",
    display: "flex",
    alignItems: "center",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
  },
  starRoot: {
    display: "flex",
    width: "50%",
    margin: "auto",
    justifyContent: "center",
  },
  starRootOnboarding: {
    width: "100%",
  },
  watchStarsModal: {
    display: "flex",
    justifyContent: "center",
  },
  cardActionsModal: {
    justifyContent: "center",
    display: "flex",
  },
  starsModal: {
    justifyContent: "center",
    fontSize: "3vw",
  },
  actionBtn: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  trailerModal: {
    margin: "3% 0",
    padding: "0 1.5rem",
  },
  ExpansionRoot: {
    margin: "auto",
    padding: "2% 25%",
  },
  btnsProviders: {
    backgroundColor: "#212120",
    color: "white",
  },
  expansionPanal: {
    dislay: "flex",
    justifyContent: "center",
    margin: "auto",
    textAlign: "center",
    background: "rgb(23, 23, 23, .96)",
    boxShadow: theme.shadows[5],
  },
  expansionPanalSummary: {
    margin: "auto",
  },
  heading: {
    margin: "auto",
  },
  serviceInfo: {
    textAlign: "center",
  },
  Link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  serviceBtn: {
    margin: "1%",
    "&:hover": {
      color: "#00B392",
    },
  },
  [theme.breakpoints.down("xs")]: {
    name: {
      padding: "0",
    },
    movieImg: {
      height: "270px",
      width: "100%",
    },
    movieImgModal: {
      width: "80%",
    },
    paper: {
      width: "24rem",
      padding: theme.spacing(0, 1, 3),
    },
    trailerModal: {
      padding: "0",
      height: "35vh",
    },
    movieInfoModal: {
      flexDirection: "column",
    },
    starsModal: {
      fontSize: "9vw",
    },
  },
  // Shortcut Provider Links
  shortLinks: {
    // border: "red solid 1px",
    background: "rgba(52, 52, 50)",
    marginLeft: "-35px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    "&:hover": {
      zIndex: 1,
    },
  },
  shortProviders: {
    display: "flex",
  },
  [theme.breakpoints.up("xs")]: {
    shortLinks: {
      background: "rgba(52, 52, 50, 0.9)",
      marginLeft: "-30px",
      "&:hover": {
        zIndex: 1,
      },
    },
    shortLinksImg: {
      width: "30px",
      "&:hover": {
        width: "50px",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    shortLinks: {
      marginLeft: "-45px",
    },
    shortLinksImg: {
      width: "35px",
      margin: "0 6px",
    },
  },
  [theme.breakpoints.up("xl")]: {
    shortLinks: {
      marginLeft: "-55px",
    },
    shortLinksImg: {
      width: "45px",
    },
  },
}));

// more fields will be appearing according to the Figma file
function MovieCard({
  userid,
  name,
  year,
  image,
  movie_id,
  ratingAction,
  watchlist,
  addToWatchlistAction,
  rated,
  ratings,
  trailer,
  description,
  genres,
  avg_rating,
  page,
  handleClickStar,
  numRatings,
  setNumRatings,
  notWatchListAction,
  notwatchlist,
  removeWatchListAction,
  removeRatingAction,
}) {
  //OKTA AUTH
  const { authState, authService } = useOktaAuth();
  const { accessToken } = authState;
  const [serviceProvider, setServiceProvider] = useState([]);
  const [yourRating, setYourRating] = useState(false);

  // placeholder image
  const missingImg =
    "https://images.unsplash.com/photo-1515198392621-a3f3588028c4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=650&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=500";
  /* Used for the star rating */
  const [rating, setRating] = useState(0);
  /* Used for dynamically rendering the "Add to watchlist" button and if it's disabled */
  const [added, setAdded] = useState(false);
  //to remove movie user not interested in
  const [removed, setRemoved] = useState(false);
  //to delete from watchist in watchlist page
  const [deleted, setDeleted] = useState(false);
  /* This checks if the movie is in the watchlist */
  const inWatchlist = watchlist.some(
    (movie) => movie.name === name && movie.year === year
  );
  const notInWatchlist = notwatchlist.some(
    (movie) => movie.name === name && movie.year === year
  );
  const removeInWatchlist = watchlist.some(
    (movie) => movie.name === name && movie.year === year
  );
  const inRatings = ratings.some(
    (movie) => movie.name === name && movie.year === year
  );
  //material-ui
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  //for button group
  const [open, setOpen] = useState(false);
  // used for poster images if they are missing.
  const [posterImg, setPosterImg] = useState(image);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  /* Used to format the movie object for action calls */
  let movie = {
    movie_id: movie_id,
    name: name,
    year: year,
    description: description,
  };
  const handleChange = (event, newValue) => {
    /* Sets rating for the star value */
    setRating(newValue);
    /* Sets rating for the POST request */
    const newRating = {
      movie_id: movie.movie_id,
      rating: newValue,
    };
    ratingAction(userid, newRating, accessToken);
    setYourRating(true);
  };
  const handleClick = () => {
    /* Adds movie to the POST request */
    addToWatchlistAction(userid, movie, accessToken);
    setAdded(true);
  };
  const deleteRating = (e) => {
    e.preventDefault();
    const RatingDeletion = {
      user_id: userid,
      movie_id: movie_id,
    };
    removeRatingAction(userid, RatingDeletion, accessToken);
  };
  const handleClickRemove = () => {
    const notWatch = { movie_id: movie.movie_id, user_id: userid };
    notWatchListAction(userid, notWatch, accessToken);
    setRemoved(true);
  };
  const handleClickDeleteFromWatchlist = () => {
    removeWatchListAction(userid, movie_id, accessToken);
    setDeleted(true);
    handleClose();
  };
  const handleClickProviders = () => {
    axiosWithAuth(accessToken)
      .get(`${userid}/service-providers/${movie.movie_id}`)
      .then((res) => {
        setServiceProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen((prevOpen) => !prevOpen);
  };
  const multiFunctions = () => {
    handleClose();
    handleClickStar();
    onboardingRating();
  };
  const onboardingRating = () => {
    setNumRatings({ ...numRatings, num: numRatings.num + 1 });
  };
  const moviePosterCheck = (imgURL) => {
    axios.get(imgURL).catch(() => {
      setPosterImg("https://source.unsplash.com/collection/1736993/500x650");
    });
  };

  useEffect(() => {
    handleClickProviders();
    moviePosterCheck(posterImg);
  }, []);

  return (
    <div className={classes.card}>
      <div className={classes.shortProviders}>
        <img
          className={classes.movieImg}
          src={posterImg}
          alt={movie.name}
          onClick={handleOpen}
        />
        {page === "Ratings" ? (
          ""
        ) : (
          <div className={classes.shortLinks}>
            {serviceProvider.map((serviceProviders) => {
              if (
                serviceProviders.provider_id === 10 &&
                serviceProviders.presentation_type === "sd" &&
                serviceProviders.monetization_type === "buy"
              ) {
                return (
                  <Link
                    key={serviceProviders.provider_id}
                    href={serviceProviders.link}
                    target="_blank"
                  >
                    <img
                      className={classes.shortLinksImg}
                      src={Amazon}
                      alt="Amazon"
                    />
                  </Link>
                );
              }
              if (serviceProviders.provider_id === 8) {
                return (
                  <Link
                    key={serviceProviders.provider_id}
                    href={serviceProviders.link}
                    target="_blank"
                  >
                    <img
                      className={classes.shortLinksImg}
                      src={Netflix}
                      alt="Netflix"
                    />
                  </Link>
                );
              }
              if (
                serviceProviders.provider_id === 10 &&
                serviceProviders.monetization_type === "rent"
              ) {
                return (
                  <Link
                    key={serviceProviders.provider_id}
                    href={serviceProviders.link}
                    target="_blank"
                  >
                    <img
                      className={classes.shortLinksImg}
                      src={Prime}
                      alt="Amazon Prime"
                    />
                  </Link>
                );
              }
              if (
                serviceProviders.provider_id === 15 &&
                serviceProviders.presentation_type === "sd"
              ) {
                return (
                  <Link
                    key={serviceProviders.provider_id}
                    href={serviceProviders.link}
                    target="_blank"
                  >
                    <img
                      className={classes.shortLinksImg}
                      src={Hulu}
                      alt="Hulu"
                    />
                  </Link>
                );
              }
              if (
                serviceProviders.provider_id === 337 &&
                serviceProviders.presentation_type === "sd"
              ) {
                return (
                  <Link
                    key={serviceProviders.provider_id}
                    href={serviceProviders.link}
                    target="_blank"
                  >
                    <img
                      className={classes.shortLinksImg}
                      src={DPlus}
                      alt="Disney Plus"
                    />
                  </Link>
                );
              }
            })}
          </div>
        )}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <DialogTitle className={classes.title} onClose={handleClose}>
              <></>
            </DialogTitle>
            <div className={classes.movieInfoModal}>
              <img
                className={classes.movieImgModal}
                src={posterImg}
                alt={name}
              />

              <div className={classes.movieContentDiv}>
                <CardContent className={classes.cardContentModal}>
                  <h1 className={classes.nameModal}> {name} </h1>
                  <div className={classes.yearGenreModal}>
                    <p className={classes.year}>{year}</p>
                    <p className={classes.genresModal}>{genres}</p>
                  </div>
                  <p className={classes.descriptionModal}>{description}</p>
                  {page === "Recommendations" ? (
                    <div className={classes.rateGenreModal}>
                      <img
                        classaName={classes.imdbImg}
                        src="https://img.icons8.com/color/48/000000/imdb.png"
                        alt={name}
                      />
                      <p className={classes.avgRatingModal}>
                        {" "}
                        {avg_rating * 2}/10
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </CardContent>
                <div className={classes.actionButtons}>
                  {page !== "Onboarding" && page !== "watchlist" ? (
                    <CardActions className={classes.cardActionsModal}>
                      <Button
                        onClick={handleClick}
                        className={classes.watchList}
                        disabled={
                          added || inWatchlist || inRatings ? true : false
                        }
                        size="small"
                        color="primary"
                      >
                        {inRatings || yourRating
                          ? "Your Rated this Movie"
                          : !added && !inWatchlist
                          ? "Add to watchlist"
                          : "In your watchlist"}
                      </Button>
                    </CardActions>
                  ) : (
                    ""
                  )}
                  {page === "Recommendations" ? (
                    <CardActions className={classes.cardActionsModal}>
                      <Button
                        onClick={handleClickRemove}
                        className={classes.watchList}
                        disabled={removed || notInWatchlist ? false : false}
                        size="small"
                        color="primary"
                      >
                        {!removed && !notInWatchlist
                          ? "Not Interested"
                          : "Not Interested"}
                      </Button>
                    </CardActions>
                  ) : (
                    ""
                  )}
                  {page === "Ratings" ? (
                    <CardActions className={classes.cardActionsModal}>
                      <Button
                        onClick={deleteRating}
                        className={classes.watchList}
                        size="small"
                        color="primary"
                      >
                        Remove Your Rating
                      </Button>
                    </CardActions>
                  ) : (
                    ""
                  )}
                </div>
                {page === "watchlist" ? (
                  <CardActions className={classes.cardActionsModal}>
                    <Button
                      onClick={handleClickDeleteFromWatchlist}
                      className={classes.watchList}
                      disabled={deleted || removeInWatchlist ? true : false}
                      size="small"
                      color="primary"
                    >
                      {!deleted && !removeInWatchlist
                        ? "Remove from Watchlist"
                        : "Removed from Watchlist"}
                    </Button>
                  </CardActions>
                ) : (
                  ""
                )}
                {page === "Onboarding" ? (
                  <Box
                    className={classes.starRootOnboarding}
                    borderColor="transparent"
                  >
                    <Stars
                      className={classes.starsModal}
                      size="large"
                      precision={0.5}
                      emptyIcon={
                        <StarBorderIcon
                          fontSize="inherit"
                          style={{ color: "#ffb400" }}
                        />
                      }
                      name={name}
                      value={rated ? rated : rating}
                      onChange={handleChange}
                      onClick={multiFunctions}
                    />
                  </Box>
                ) : (
                  <Box className={classes.starRoot} borderColor="transparent">
                    <Stars
                      className={classes.starsModal}
                      size="large"
                      precision={0.5}
                      emptyIcon={
                        <StarBorderIcon
                          fontSize="inherit"
                          style={{ color: "#ffb400" }}
                        />
                      }
                      name={name}
                      value={rated ? rated : rating}
                      onChange={handleChange}
                    />
                  </Box>
                )}
                {page !== "Onboarding" ? (
                  <div className={classes.ExpansionRoot}>
                    <ExpansionPanel className={classes.expansionPanal}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.expansionPanalSummary}
                      >
                        <Typography className={classes.heading}>
                          Where to Watch
                        </Typography>
                      </ExpansionPanelSummary>
                      <div className={classes.serviceInfo}>
                        {serviceProvider.map((serviceProviders) => {
                          return (
                            <div key={serviceProviders.link}>
                              <Link
                                href={serviceProviders.link}
                                className={classes.Link}
                                target="_blank"
                              >
                                <Button
                                  variant="outlined"
                                  className={classes.serviceBtn}
                                >
                                  {serviceProviders.name}
                                </Button>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </ExpansionPanel>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {page !== "Onboarding" ? (
              <iframe
                className={classes.trailerModal}
                title={name}
                width="100%"
                height="345vh"
                margin-left="auto"
                margin-right="auto"
                padding="2%"
                src={trailer}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              ""
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    ratingError: state.rating.error,
    watchlist: state.watchlist.movies,
    watchlistError: state.watchlist.error,
    ratings: state.rating.movies,
    notwatchlist: state.notwatchlist.movies,
  };
};
export default connect(mapStateToProps, {
  ratingAction,
  addToWatchlistAction,
  notWatchListAction,
  removeWatchListAction,
  removeRatingAction,
})(MovieCard);
