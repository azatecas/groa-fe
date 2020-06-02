import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { getAllByText } from "@testing-library/dom";
import { Router, Route } from "react-router-dom";
import { getAllByTestId, getByTestId } from "../../utils/test-utils.js";
import { createMemoryHistory } from "history";

// component to be tested.
import DataUpload from "./DataUpload.js";

// redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
const mockStore = configureStore([]);

it("renders DataUpload component", () => {
  let history = createMemoryHistory();
  let store;
  store = mockStore({
    login: {
      userid: 4
    },
    upload: {
      ratings: [],
      reviews: [],
      watched: [],
      watchlist: []
    }
  });
  const { container } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={DataUpload} />
      </Router>
    </Provider>
  );
  let component = getAllByTestId(container, "DataUploadPage-test");
  expect(component.length).toBe(1);
});
