import React from "react";
import { render,fireEvent, } from "@testing-library/react";
import { getAllByText } from "@testing-library/dom";
import { getAllByTestId, getByTestId } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";

// component to be tested.
import Register from "./Register.js";

// redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
const mockStore = configureStore([]);

let store = mockStore({
    login: {
      userid: 4
    },
    register: {
      success: false,
      error: ""
    }
});

it("renders Register component", () => { 

    const { container } = render(
        <Provider store={store}>
            <Router>
                <Register />
            </Router >
        </Provider>

    ); 
    const component = getAllByTestId(container, "register-component"); 
    expect(component.length).toBe(1); 
});

it("renders errors to register on Click if info not filled out", () => {
    const { container } = render(
        <Provider store={store}>
            <Router>
                <Register />
            </Router >
        </Provider>

    );

    let form = getAllByTestId(container, "registerForm");
    expect(form.length).toBe(1);

    fireEvent.submit(getByTestId(container, "registerForm"))
    let component = getAllByText(container, "Email is required");
    expect(component.length).toBe(1);  

    component = getAllByText(container, "Password is required");
    expect(component.length).toBe(1); 

    component = getAllByText(container, "Username is required");
    expect(component.length).toBe(1);   
});
