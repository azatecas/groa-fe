import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";
// component to be tested.
import Ratings from "./Ratings.js";
//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);

it("renders Ratings with array has length.", async () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    rating: {
      error: ""
    },
    register: {
      success: false,
      error: ""
    },
    rating: {
      movies: [
        { Title: "The Godfather", Year: "1972" },
        { Title: "The Wizard of Oz", Year: "1939" },
        { Title: "Citizen Kane", Year: "1941" }
      ],
      error: ""
    },
    upload: {
      isUploading: true
    },
    watchlist: {
      isFetching: false,
      movies: []
    },
    recommendations: {
      isFetching: false,
      movies: []
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Router>
        <Ratings />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "ratings-component");
  expect(component.length).toBe(1);
});

it("renders LoadingScreen when ratings array is empty", () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    register: {
      success: false,
      error: ""
    },
    recommendations: {
      isfetching: false,
      movies: []
    },
    rating: {
      isFetching: true,
      movies: [],
      error: ""
    },
    upload: {
      isUploading: false
    },
    watchlist: {
      isFetching: false,
      movies: []
    },

  });
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Ratings />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "loading-screen-component");
  expect(component.length).toBe(1);
});
