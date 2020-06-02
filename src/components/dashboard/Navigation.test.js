import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { getAllByTestId } from "../../utils/test-utils.js";

// component to be tested.
import Navigation from "./Navigation.js";

// redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

it("renders navigation component", () => {
  const mockStore = configureStore([]);
  let store;
  store = mockStore({
    login: {
      userid: 4
    }
  });
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Navigation />
      </Router>
    </Provider>
  );

  // the uri when this component renders is "/" so it'll go to the RegisterNavLinks component
  const component = getAllByTestId(container, "navigation");
  expect(component.length).toBe(1);
});

it("logout button renders", () => {
  const mockStore = configureStore([]);
  let store = mockStore({
    login: {
      userid: 4
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Router>
        <Navigation />
      </Router>
    </Provider>
  );

  let logoutBtn = getAllByTestId(container, "logoutBtn");
  expect(logoutBtn.length).toBe(1);
});
