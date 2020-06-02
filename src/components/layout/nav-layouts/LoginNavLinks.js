import React from "react";
import { ifDev } from "../../../utils/removeAttribute.js";
// styling imports
import GroaLogo from "../../../img/groa-logo-nav.png";


export default function LoginNavLinks() {
  return (
    <div className="login nav" data-test={ifDev("login-nav-component")}>
      <img src={GroaLogo} alt="Groa Logo" />
     <h2 className="signin-title">Sign In</h2>
    </div>
  );
}
// 