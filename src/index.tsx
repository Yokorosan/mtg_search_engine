import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.scss";
import App from "./App";
import { MtgProvider } from "./contexts/mtgcontext";
import { RenderProvider } from "./contexts/rendercontext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MtgProvider>
      <RenderProvider>
        <App />
      </RenderProvider>
    </MtgProvider>
  </React.StrictMode>
);
