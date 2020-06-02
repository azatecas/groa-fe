import React from "react";
import { ifDev } from "../../utils/removeAttribute";

export default function PostLogin() {
  return (
    <div className="container post-login">
      <header>
        <h1>Groa grows with you.</h1>
        <p>
          The more movies you rate.
          <br />
          The better your recommendations.
        </p>
      </header>
      <section
        className="choice-selection-container"
        data-test={ifDev("post-login-component")}
      >
        <h2>Select how you would like to join:</h2>
        <div className="choice-selection">
          <section className="uploading choice-box">
            <h4 data-test={ifDev("upload-ratings-header")}>
              Upload ratings from
            </h4>
            <div className="logos img-box">
              <img
                src="img/letterboxd-logo.svg"
                alt="Letterboxd's logo."
                className="letterboxd-logo"
              />
              <p className="hidden">or</p>
              <img
                src="img/imdb-logo.svg"
                alt="IMDb's logo."
                className="imdb-logo hidden"
              />
            </div>
            <p>
              For users who already have an account on this popular film rating
              site.
            </p>
            <button
              className="select-btn"
              data-test={ifDev("upload-ratings-button")}
              onClick={() => console.log("uploading selected")}
            >
              Select
            </button>
          </section>
          <section className="setup-wizard choice-box hidden">
            <h4>Recommendation setup wizard</h4>
            <div className="setup-wizard-img img-box">
              <img
                src="https://via.placeholder.com/285x352.png?text=*illustration that represents user cheerfully going through setup*"
                alt="Placeholder from placeholder.com"
                className="setup-img"
              />
            </div>
            <p>For users who want to use Groa without uploading data.</p>
            <button
              className="select-btn"
              onClick={() => console.log("setup wizard selected.")}
            >
              Select
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}
