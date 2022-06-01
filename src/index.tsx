import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Map from "./components/routes/map/Map";
import {store} from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stats from "./components/routes/stats/Stats";
import Header from "./components/Header";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
      <Provider store={store}>
          <Router>
              <Header/>
              <Routes>
                  <Route path="/" element={<div>Nothing here</div>} />
                  <Route path="/map" element={<Map/>} />
                  <Route path="/stats" element={<Stats/>} />
              </Routes>
          </Router>
      </Provider>
);