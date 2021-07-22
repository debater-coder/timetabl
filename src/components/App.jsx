import React, { useState } from 'react';
import './App.css';
import User from '../User';

let App = () => {
  let [user] = useState(new User);
  return (
    <div className='App'>
      {
        user.logged_in ? <button onClick={user.logout}>Log out</button> : <button onClick={user.login}>Log in</button>
      }
      <p>Hello, world!</p>
    </div>
  );
};


export default App;
