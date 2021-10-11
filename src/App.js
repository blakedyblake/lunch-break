import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router'
import React from 'react';


function App() {
  return (
    <>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </>
  );
}

export default App;
