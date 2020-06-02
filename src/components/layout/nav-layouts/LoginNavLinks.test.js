import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";

// component to be tested.
import LoginNavLinks from "./LoginNavLinks.js";

it("renders login-nav-component", () => {
  const { container } = render(
    <Router>
      <LoginNavLinks />
    </Router>
  );

  const component = getAllByTestId(container, "login-nav-component");
  expect(component.length).toBe(1);
});
