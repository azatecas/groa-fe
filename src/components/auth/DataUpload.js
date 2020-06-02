import React, { useState, useEffect } from "react";
// tools
import { connect } from "react-redux";
import { uploadAction, setFilter } from "../../store/actions/index.js";
import { ifDev } from "../../utils/removeAttribute.js";
import letterboxdLogo from "../../img/letterboxd-logo.svg";
// import imdbLogo from "../../img/imdb-logo.svg";
import fileAlt from "../../img/file-alt.svg";
// children components
import Congratulations from "./Congratulations.js";
import LoadingScreen from "../layout/LoadingScreen.js";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

const DataUpload = ({ userid, uploadAction, isUploading, setFilter }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  //OKTA AUTH
  const { authState, authService } = useOktaAuth();
  const { accessToken } = authState;

  useEffect(() => {
    setFilter("");
  });

  const toggleInstructions = (window.onclick = function (event) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    const dropdowns2 = document.getElementsByClassName(
      "dropdown-content-Empty"
    );
    var i;

    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    if (event.target.matches(".dropBtn")) {
      event.target.nextSibling.classList.toggle("show");
    }
    for (i = 0; i < dropdowns2.length; i++) {
      let openDropdown2 = dropdowns2[i];
      if (openDropdown2.classList.contains("show2")) {
        openDropdown2.classList.remove("show2");
      }
    }
    if (event.target.matches(".dropBtn")) {
      event.target.nextSibling.classList.toggle("show2");
      event.target.nextSibling.nextSibling.classList.toggle("show2");
    }
  });

  const handleChange = (file) => {
    console.log("This is the file that is uploaded: ", file);
    let formData = new FormData();
    formData.append("movies", file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    uploadAction(userid, formData, setUploadSuccess, accessToken);
    formData = new FormData();
  };

  const onDragStart = (e) => {
    e.preventDefault();
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onFileDrop = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files;
    handleChange(files[0]);
  };
  if (isUploading) return <LoadingScreen />;
  else if (uploadSuccess) return <Congratulations />;
  else
    return (
      <div className="DataUploadPage" data-test="DataUploadPage-test">
        <div>
          <div className="textholder1">
            <h1>Already rated movies elsewhere?</h1>
            <h3>
              Groa lets you easily upload your ratings from either LetterBoxd or
              IMDb:
            </h3>
          </div>

          <div className="DboxContainer">
            <div className="dropdown">
              <img
                className="centerBtn"
                src={letterboxdLogo}
                alt="Letterboxd Logo"
              />
              <button
                onClick={toggleInstructions}
                data-test={ifDev("clickLetterBoxd")}
                className="dropBtn centerBtn"
              >
                Show Letterboxd Instructions
              </button>

              <div id="myDropdownL" className="dropdown-content">
                <div className="DboxLeft">
                  <div className="textContainer">
                    <p>
                      1. Log in to{" "}
                      <a
                        id="pLink"
                        href="https://letterboxd.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Letterboxd
                      </a>
                      .
                    </p>
                    <p>
                      2. Click on your username and select
                      <strong> Settings</strong> from the dropdown menu.
                    </p>
                    <p>
                      3. Navigate to the <strong> Import & Export</strong> tab
                      and select <strong> Export Your Data</strong>.
                    </p>
                    <p>4. Tap to browse and attach the .zip file below.</p>
                  </div>
                </div>
                {/* END  DboxLeft*/}
              </div>
              {/* END dropdown-content*/}
              {/* EMPTY DIV - Postions Upload Box to bottom of screen */}
              <div className="dropdown-content-Empty"></div>
            </div>
            {/* END DROPDOWN */}

            {/* RIGHT SIDE DIV - IMDB UPLOAD */}
            {/* <div className="dropdown imdb" id="dropdownimdb">
              <button
                onClick={toggleInstructions}
                data-test={ifDev("clickIMDb")}
                className="dropbtn"
              >
                IMDb Instructions
              </button>
              <div id="myDropdownR" className="dropdown-content">
                <div className="DboxRight">
                  <img src={imdbLogo} alt="IMDb Logo" />
                  <div>
                    <p>1.Log in to IMDb</p>
                    <p>
                      2.Click on your username and select your ratings fromthe
                      dropdown menu.
                    </p>
                    <p>
                      3.Click on the icon and select Export. Save the
                      ratings.csv file somwhere convenient like your desktop or
                      downloads folder.
                    </p>
                    <p>4.Click to browse or simply drop your .csv file below</p>
                  </div>
                </div> */}
            {/* END DboxRight*/}
            {/* </div> */}
            {/* END dropdown-content*/}
            {/* </div> */}
            {/* END DROPDOWN */}
          </div>
          {/* END DboxContainer */}

          {/* ///////////////UPLOAD FILE //////////////////// */}
          <div className="UploadContainer">
            <form
              encType="multipart/form-data"
              className="inputholder"
              onDragEnter={onDragStart}
              onDragOver={onDragOver}
              onDrop={onFileDrop}
            >
              <input
                className="uploadData"
                type="file"
                name="movies"
                id="movies"
                onChange={handleChange}
              />
              <label id="uploadLabel" htmlFor="movies">
                <p>Drag files here or click to browse</p>
                <img src={fileAlt} alt="File icon" />
              </label>
            </form>
          </div>
          <div className="textholder2">
            <p className="ptext">
              We value your privacy and strive to be transparent. Your data is
              kept strictly confidential; only you can view or access it.
            </p>
          </div>
        </div>
      </div>
      // END DataUploadPage
    );
};
const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    isUploading: state.upload.isUploading,
  };
};

export default connect(mapStateToProps, { uploadAction, setFilter })(
  DataUpload
);
