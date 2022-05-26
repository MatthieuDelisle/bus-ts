import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Home from "./components/Home";
import {store} from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stats from "./components/Stats";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path="/" element={<div>Nothing here</div>} />
                  <Route path="/map" element={<Home/>} />
                  <Route path="/stats" element={<Stats/>} />
              </Routes>
          </Router>
      </Provider>
  </React.StrictMode>
);