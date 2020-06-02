import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";
// component to be tested.
import Watchlist from "./Watchlist.js";
//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);

it("renders Watchlist with array has length.", async () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    recommendations: {
      movies: [],
      isFetching: false
    },
    watchlist: {
      movies: [
        { Title: "The Godfather", Year: "1972" },
        { Title: "The Wizard of Oz", Year: "1939" },
        { Title: "Citizen Kane", Year: "1941" }
      ],
      isFetching: false,
      isDeleting: false,
      error: ""
    },
    upload: {
      isUploading: false
    },
    rating: {
      error: "",
      isFetching: false
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Router>
        <Watchlist />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "watchlist-component");
  expect(component.length).toBe(1);
});

it("renders LoadingScreen when the watchlist array is empty", () => {
  let store = mockStore({
    login: {
      userid: 4
    },
    recommendations: {
      movies: [],
      isFetching: false
    },
    watchlist: {
      isFetching: true,
      movies: [],
      isDeleting: false,
      error: ""
    },
    upload: {
      isUploading: false
    },
    rating: {
      isFetching: false
    }
  });
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Watchlist />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "loading-screen-component");
  expect(component.length).toBe(1);
});
