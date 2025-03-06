import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Url } from "./hooks/Context/context";

let persistor = persistStore(store);
let url = "http://localhost:8080"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Url.Provider value = {url}>
        <App />
        <ToastContainer />
      </Url.Provider>
    </PersistGate>
  </Provider>
);
