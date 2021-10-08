import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router'
import React from 'react';

export const ConfigContext = React.createContext({
  userId: null,
});
const configValue = {
  
}
function App() {
  return (
    <ConfigContext.Provider value={configValue}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </ConfigContext.Provider>
  );
}

export default App;
