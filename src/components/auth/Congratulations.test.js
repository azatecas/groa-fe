import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";

// component to be tested
import Congratulations from "./Congratulations.js";

//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore()
let store = mockStore({
    login: {
        userid: 4
    },
})

it("renders Congratulations component", () => {
    const { container } = render(
        <Provider store={store}>
            <Router>
                <Congratulations />
            </Router>
        </Provider>
    );
    const component = getAllByTestId(container, "congrats-screen");
    expect(component.length).toBe(1);
});
