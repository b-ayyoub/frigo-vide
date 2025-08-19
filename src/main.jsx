import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FridgeProvider } from "./context/FridgeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FridgeProvider>
      <App />
    </FridgeProvider>
  </React.StrictMode>
);
