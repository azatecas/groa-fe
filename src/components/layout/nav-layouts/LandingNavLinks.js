import React from "react";
import { ifDev } from "../../../utils/removeAttribute.js";
import GroaLogo from "../../../img/groa-logo-nav.png";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  registerNav: {
    fontFamily: 'Work Sans',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center'
  },
  img: {
    alignItems: 'center',
    height: '2.5rem',
    width: 'auto',
  },

  [theme.breakpoints.down("xs")]: {
    registerNav: {
      display: 'flex',
      flexDirection: "column",
    },
    accessAccount:{
      paddingTop:'5%',
      fontSize: '20px',
    },
  },
}));
export default function RegisterNavLinks() {
  const styles = useStyles();
  return (
    <div className={styles.registerNav} data-test={ifDev("register-nav-component")}>
    <img className={styles.img} src={GroaLogo} alt="Groa Logo" />
    <h3 className={styles.accessAccount}>Explore Groa</h3>
  </div>
  );
}
