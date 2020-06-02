import React from "react";
import { render } from "@testing-library/react";
import { getAllByTestId, getByTestId, getAllByText } from "../../utils/test-utils.js";
import { BrowserRouter as Router } from "react-router-dom";
//  redux testing
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);

import MovieCard from "./MovieCard.js";


let store = mockStore({
    login: {
      userid: 4
    },
    rating: {
        error: ""
    },
    watchlist: {
        movies: []
    }
});

it("renders movieCard with array has length", () => {

    const fakemovies = 
        {name:'a', Year: '1000'}



    const { container } = render( 
        <Provider store={store}>
            <Router>
                <MovieCard name={fakemovies.name}/>
            </Router >
        </Provider>
    );

let box = getAllByTestId(container, "box");
expect(box.length).toBe(1)

});