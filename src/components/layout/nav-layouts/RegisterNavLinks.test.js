import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";

// component to be tested.
import RegisterNavLinks from "./RegisterNavLinks.js";

it("renders register-nav-component", () => {
  const { container } = render(
    <Router>
      <RegisterNavLinks />
    </Router>
  );

  const component = getAllByTestId(container, "register-nav-component");
  expect(component.length).toBe(1);
});
