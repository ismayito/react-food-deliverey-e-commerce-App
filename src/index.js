import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter as Router} from 'react-router-dom';
import { StateProvider } from "./Components/Context/stateProvider";
import { initialState } from "./Components/Context/initialState";
import reducer from "./Components/Context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <Router>
  <StateProvider initialState={initialState} reducer={reducer}>
  
    <App />
  
  </StateProvider>
  </Router>);

