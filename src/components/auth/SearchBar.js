import React from "react";
import useStateWithCallback from "use-state-with-callback";
import { connect } from "react-redux";
import { loginAction, searchAction } from "../../store/actions";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
//for search bar
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    width: "40%",
    margin: "auto",
    paddingTop: "1%",
  },
  [theme.breakpoints.down("xs")]: {
    searchContainer: {
      width: "90%",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#212120",
  },
  inputRoot: {
    color: "#212120",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

const Navigation = ({ searchAction, userid }) => {
  const { authState } = useOktaAuth();
  const { accessToken } = authState;
  const classes = useStyles();
  const [query, setQuery] = useStateWithCallback(
    {
      query: "",
    },
    (query) => {
      searchAction(userid, query, accessToken);
    }
  );

  const handleChange = (e) => {
    setQuery({ query: e.target.value });
  };

  const handleSubmit = (e) => {
    if (query.query === "") {
      searchAction(userid, query, accessToken);
    }
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          type="text"
          onChange={handleChange}
          value={query.query}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    searchTerm: state.filter.searchTerm,
  };
};
export default connect(mapStateToProps, {
  loginAction,
  searchAction,
})(Navigation);
