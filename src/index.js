import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//fonts
import './assets/fonts/fonts.css'
import { HashRouter,Routes,Route } from "react-router-dom";


//prismic


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >

    <App />

  </React.StrictMode>
);
