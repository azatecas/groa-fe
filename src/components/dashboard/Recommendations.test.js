import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";
// component to be tested.
import Recommendations from "./Recommendations.js";
//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);

it("renders Recommendations with array has length.", async () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    rating: {
      error: "",
      isFetching: false
    },
    register: {
      success: false,
      error: ""
    },
    recommendations: {
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
      movies: [],
      isFetching: false
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Router>
        <Recommendations />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "recommendations-component");
  expect(component.length).toBe(1);
});

it("renders LoadingScreen when recommendations array is empty", () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    register: {
      success: false,
      error: ""
    },
    recommendations: {
      isFetching: true,
      movies: [],
      error: ""
    },
    rating: {
      error: "",
      isFetching: false
    },
    upload: {
      isUploading: false
    },
    watchlist: {
      movies: [],
      isFetching: false
    },
    rating: {
      isFetching: false
    }
  });
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Recommendations />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "loading-screen-component");
  expect(component.length).toBe(1);
});
