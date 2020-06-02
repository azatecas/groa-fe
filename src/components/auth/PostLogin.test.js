import React from "react";
import { render } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { getAllByTestId } from "../../utils/test-utils.js";
import { createMemoryHistory } from "history";

// component to be tested.
import PostLogin from "./PostLogin";

it("renders PostLogin component on the path '/setup-wizard'", () => {
  let route = "/setup-wizard";
  const { container } = render(
    <Router history={createMemoryHistory({ initialEntries: [route] })}>
      <Route path={route} component={PostLogin} />
    </Router>
  );

  let component = getAllByTestId(container, "post-login-component");
  expect(component.length).toBe(1);
});

it("renders Upload from ratings header", () => {
  let route = "/setup-wizard";
  const { container } = render(
    <Router history={createMemoryHistory({ initialEntries: [route] })}>
      <Route path={route} component={PostLogin} />
    </Router>
  );

  let component = getAllByTestId(container, "upload-ratings-header");
  expect(component.length).toBe(1);
});

it("renders button to upload ratings", () => {
  let route = "/setup-wizard";
  const { container } = render(
    <Router history={createMemoryHistory({ initialEntries: [route] })}>
      <Route path={route} component={PostLogin} />
    </Router>
  );

  let component = getAllByTestId(container, "upload-ratings-button");
  expect(component.length).toBe(1);
});
