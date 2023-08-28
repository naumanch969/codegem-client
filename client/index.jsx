import React from 'react';
import "./index.css"
import App from "./App"
import { createRoot } from 'react-dom/client';

// setting up a store
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import reducers from './reducers'
import thunk from "redux-thunk"
const store = createStore(reducers, compose(applyMiddleware(thunk)))

import { ContextProvider } from "./contexts/ContextProvider"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ContextProvider>
        <Provider store={store}>
            <App tab="home" />
        </Provider>
    </ContextProvider>
);

