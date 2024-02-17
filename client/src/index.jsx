import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./globals.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { store } from "./redux/store";
import { ModalProvider } from "./providers/ModalProvider";
import { ToastProvider } from "./providers/ToastProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ContextProvider>
      <BrowserRouter>
        <ModalProvider />
        <ToastProvider />
        <App />
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);
