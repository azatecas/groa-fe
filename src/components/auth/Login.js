import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../store/actions";
import { ifDev } from "../../utils/removeAttribute.js";

//OKTA
import { useOktaAuth } from '@okta/okta-react';

// styling imports
import Picture1 from "../../img/watching-tv.png";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Navbar Login
import LoginNavLinks from "../layout/nav-layouts/LoginNavLinks.js";

//link to register
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© 2020 by GROÁ, All rights reserved"}
      <Link color="white" to="/privacy-policy">
        GROÁ Privacy Policy
      </Link>
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  textField: {
    display: "flex",
    marginBottom: "2%",
    width: "100%",
    padding: "0",
  },
}));

const LoginPage = (props) => {

  //OKTA useOKTA AUTH
  const { authState, authService } = useOktaAuth();

  //Okta Login/Logout redirects
  const login = async () => authService.login('/');
  const logout = async () => authService.logout('/');

  useEffect(() => {
    if (authState.isAuthenticated) {
      authService.getUser()
        .then((info) => {
          props.loginAction(authState.accessToken, info.sub, props.history)
        })
        .catch(err => console.log("Error fetching User info in UseEffect", err))
    }
  }, []);

  return (
    <div
      className="container login-component"
      data-test={ifDev("login-component")}
    >
      {/* NAVIGATION */}
      <div className="onboarding-nav login-nav">
        <LoginNavLinks />
      </div>
      <div className="box-container">
        <div className="box-left">
          <div className="text-container">
            <h1>
              Welcome <br /> back.
            </h1>
            <h5>
              {" "}
              Groa makes it easy to find a film you’ll love. <br /> What new
              favorite will you discover today?
            </h5>
          </div>
          <div className="image-wrapper">
            <img className="logo" src={Picture1} alt="Graphic" />
          </div>
        </div>
        <div>
          <p>IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII</p>
          {!authState.isAuthenticated ? <p onClick={login}>Please Login</p> : <p> You are Logged in <span onClick={logout}>Logout </span></p>}
        </div>
      </div>
      {/* END OF MAIN CONTENT */}
      <Box mt={2}>
        <Copyright />
      </Box>
    </div>
    // END LOGIN PAGE
  );
};

const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    errorStatus: state.login.error,
  };
};
export default connect(mapStateToProps, { loginAction })(LoginPage);
