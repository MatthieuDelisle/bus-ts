import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Map from "./components/routes/map/Map";
import {store} from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stats from "./components/routes/stats/Stats";
import Header from "./components/Header";
import AppLayout from './components/layout/AppLayout';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard';
//import Map from './pages/Map';
import Parameter from './pages/Parameter';
import Simulation from './pages/Simulation';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
  

root.render(
    <Provider store={store}>
    <Router>
        <Routes>
                        <Route path='/' element={<AppLayout />}>
                        <Route path="/Map" element={<Map/>} />
                        <Route path='/Dashboard' element={<Dashboard />} />
                        <Route path='/Chart' element={<Chart />} />
                        <Route path='/Simulation' element={<Simulation />} />
                        <Route path='/Parameter' element={<Parameter />} />  
                    </Route>

        </Routes>
    </Router>
</Provider>
)

