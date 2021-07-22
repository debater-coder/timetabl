import React, { useState } from 'react';
import './App.css';
import User from '../User';

let App = () => {
  let [loggedIn, setLoggedIn] = useState(false)
  let [user] = useState(new User(setLoggedIn));
  return (
    <div className='App'>
      {
        loggedIn ? <button onClick={user.logout}>Log out</button> : <button onClick={user.login}>Log in</button>
      }
      <p>Hello, world!</p>
    </div>
  );
};


export default App;
