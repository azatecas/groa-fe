import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography
      className="footer"
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="white" to="/">
        GROÁ FOUNDATION INC
      </Link>{" "}
      {"."}
      <Link color="white" to="/privacy-policy">
        GROÁ Privacy Policy
      </Link>
    </Typography>
  );
};

export default Copyright;
