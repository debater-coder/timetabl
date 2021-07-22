import React, { useState } from 'react';
import './App.css';
import User from '../User';

let App = () => {
  let [user] = useState(User);
  return (
    <div className='App'>
      {
        <button onClick={user.login}>Log in</button> ? user.logged_in :
        <button onClick={user.logout}>Log out</button>
      }
      <p>Hello, world!</p>
    </div>
  );
};


export default App;
