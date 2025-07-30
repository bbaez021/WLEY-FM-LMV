import React from 'react';
// import logo from './logo.svg';
import Nav from "./Nav";
import Home from "./Home";
import Add from "./Add";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/calendar"/>
                <Route path ="/songs"/>
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
