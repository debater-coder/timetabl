import React, { useEffect, useState } from 'react';
import './App.css';
import { apiRequest, finalize_login, login, logout } from '../user';

let App = () => {
  let [loggedIn, setLoggedIn] = useState(false)
  let [name, setName] = useState("")
  let [points, setPoints] = useState(-1)

  // Equivalent to ComponentDidMount
  useEffect(() => {
    // Stash the query string away
    let query = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    window.history.replaceState({}, null, '/');

    if ("code" in query && "state" in query) {
      finalize_login(query.code, query.state).then(
        () => {
          setLoggedIn(true)
        }
      )
    } else if (localStorage.getItem("access_token") !== null && localStorage.getItem("refresh_token") !== null) {
      // We are already logged in
      setLoggedIn(true)
    }
  })

  useEffect(() => {
    if (loggedIn) {
      apiRequest('details/userinfo')
        .then(data => setName(data["givenName"] + " " + data["surname"]))
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      apiRequest('details/participation')
        .then(data => {
          console.log(data.splice(-1))
          setPoints(data.splice(-1).points)
        })
    }
  }, [loggedIn])


  return (
    <div className='App'>
      {
        loggedIn ?
          <button onClick={
            () => logout().then(() => setLoggedIn(false))
          }>Log out</button> :

          <button onClick={login}>Log in</button>
      }

      { name !== "" ? <p>Hello, {name}!</p> : ""}
      {points !== -1 ? <p>You have {points} award scheme points!</p> : ""}

    </div>
  );
};


export default App;
