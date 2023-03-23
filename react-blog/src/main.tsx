import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./routes";
import "./index.css";
import { PocketProvider } from "./components/PocketContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PocketProvider>
      <Routes />
    </PocketProvider>
  </React.StrictMode>
);
