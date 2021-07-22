import React, { useState } from 'react';
import './App.css';
import User from '../User';

let App = async () => {
  let [loggedIn, setLoggedIn] = useState(false)
  let [user] = useState(new User(setLoggedIn));
  let participation = await user.apiRequest("details/participation")

  console.log(participation)
  return (
    <div className='App'>
      {
        loggedIn ? <button onClick={user.logout}>Log out</button> : <button onClick={user.login}>Log in</button>
      }
      <p>Hello, {loggedIn ? await user.apiRequest("details/userinfo")["givenName"] : "Anonymous"}</p>
      {loggedIn ? <p>You have {participation.pop()["points"]} award scheme points</p> : <p>You are not logged in</p>}
    </div>
  );
};


export default App;
