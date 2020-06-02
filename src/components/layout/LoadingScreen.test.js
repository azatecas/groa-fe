import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";
// component to be tested.
import LoadingScreen from "./LoadingScreen.js";
//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);

it("renders loading screen", () => {
  let store = mockStore({
    upload: {
      isUploading: true
    },
    watchlist: {
      isFetching: false
    },
    recommendations: {
      isFetching: false
    },
    rating: {
      isFetching: false
    }
  });
  const { container } = render(
    <Provider store={store}>
      <Router>
        <LoadingScreen />
      </Router>
    </Provider>
  );

  let component = getAllByTestId(container, "loading-screen-component");
  expect(component.length).toBe(1);

  component = getAllByTestId(container, "loading-object");
  expect(component.length).toBe(1);
});
