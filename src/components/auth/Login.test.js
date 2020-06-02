import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { getAllByText } from "@testing-library/dom";
import { getAllByTestId, getByTestId } from "../../utils/test-utils";

// component to be tested.
import Login from "./Login";

// redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
const mockStore = configureStore([]);

let store;
store = mockStore({
  login: {
    userid: null
  }
});

it("renders login component", () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  const component = getAllByTestId(container, "login-component");
  expect(component.length).toBe(1);
});

describe("Button", () => {
  it("should be defined", () => {
    expect(Login).toBeDefined();
  });
});

it("renders errors to login on Click if info not filled out", () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  let form = getAllByTestId(container, "loginForm");
  expect(form.length).toBe(1);
  fireEvent.submit(getByTestId(container, "loginForm"));

  let component = getAllByText(container, "Username is required");
  expect(component.length).toBe(1);

  component = getAllByText(container, "Password is required");
  expect(component.length).toBe(1);
});
