import React from 'react';
// import logo from './logo.svg';
// import Nav from "./Nav";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
            {/* <Nav/> */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add"/>
                <Route path="/search"/>
                <Route path ="/songs/:id"/>
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
