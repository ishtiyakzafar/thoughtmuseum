import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import Loader from "./components/loader";
import { Provider } from "react-redux";
import { store } from "./store";

window.store = store;
console.log("Store updated", store.getState());

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
