import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Provider } from "react-redux"

import "./index.css"
import App from "./App"
import { ContextProvider } from "./contexts/ContextProvider"
import {store} from './redux/store'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>    {/* react-redux */}
    <ContextProvider>         {/* context-api */}
      <BrowserRouter>         {/* react-router-dom */}
        <GoogleOAuthProvider clientId='403911982205-39e2mt4fktk7c2htqtgvq3r2oqh8hjnq.apps.googleusercontent.com'>{/* google-authentication */}
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);