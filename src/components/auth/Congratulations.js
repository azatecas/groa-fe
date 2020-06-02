import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SuccessImg from "../../img/success-man.png";

const Congrats = ({ userid }) => {
  return (
    <div className="CongratsPage" data-test="congrats-screen">
      <div className="CenterBox">
        <div className="congratsForm">
          <div className="textHolder">
            <h1>Congratulations!</h1>
            <h2>Your ratings have been successfully uploaded.</h2>
            <div className="image">
              <img src={SuccessImg} alt="Success png" />
            </div>
            <button>
              <Link to={`/${userid}/recommended`} style={{ color: "white", textDecoration: "none" }}>Go to Dashboard</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userid: state.login.userid,
    errorStatus: state.login.error
  };
};
export default connect(mapStateToProps, {})(Congrats);
