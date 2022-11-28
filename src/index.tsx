import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/Sass/pages/index.scss";
import App from "./App";
import { MtgProvider } from "./contexts/mtgcontext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MtgProvider>
      <ToastContainer />
      <App />
    </MtgProvider>
  </React.StrictMode>
);
