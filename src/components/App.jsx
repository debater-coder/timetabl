import React, { useEffect, useState } from 'react';
import './App.css';
import User from '../User';

let App =() => {
  let [loggedIn, setLoggedIn] = useState(false)
  // let [user] = useState(new User(setLoggedIn));
  // let [name, setName] = useState("")
  // let [points, setPoints] = useState(-1)

  // useEffect(() => {
  //   if (loggedIn) {
  //     console.log("foo")
  //     user.apiRequest("details/userinfo")
  //       .then(data => setName(data["givenName"] + data["surname"]))
  //   }
  // }, [loggedIn])
  //
  // useEffect(() => {
  //   if (loggedIn) {
  //     console.log("bar")
  //     user.apiRequest("details/participation")
  //       .then(data => setPoints(data.splice(-1)["points"]))
  //   }
  // }, [loggedIn])

  return (
    <div className='App'>
      {
        loggedIn ? <button onClick={user.logout}>Log out</button> : <button onClick={user.login}>Log in</button>
      }
      {/*{ name !== "" ? <p>Hello, {name}!</p> : ""}*/}
      {/*{points !== -1 ? <p>You have {points} award scheme points!</p> : ""}*/}

    </div>
  );
};


export default App;
