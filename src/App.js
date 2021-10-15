import './App.css';
import Router from './router'
import React, {useState} from 'react';
import {GlobalContext} from './Context/IdProvider';



function App(props) {
  const [user_id, setUserId] = useState(0);
  const [total, setTotal] = useState(0)
  const [rest_id, setRestId] = useState(0)
  
  const global_values = {
    user_id,
    setUserId,
    total,
    setTotal,
    rest_id,
    setRestId
  }
  
  
  return (
    <div className='App'>
      <GlobalContext.Provider value={global_values}>
        {Router}
      </GlobalContext.Provider>
    </div>
      

  );
}



export default App;
