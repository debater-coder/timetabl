import React, { useEffect, useState } from 'react';
import './App.css';

const generateRandomString = () => {
  let array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
};

const login = (event) => {
  event.preventDefault()
  let state = generateRandomString()
  localStorage.setItem("oauth-state", state);
  window.location = `https://student.sbhs.net.au/api/authorize?response_type=code&client_id=timetabl&redirect_uri=https%3A%2F%2Fsbhs-timetabl.netlify.app%2F&scope=all-ro&state=${state}`
}

let App = () => {
  let [name, setName] = useState("Anonymous")

  useEffect(() => {

    let query = Object.fromEntries(new URLSearchParams(window.location.search).entries());

    window.history.replaceState({}, null, "/");

    if ("state" in query && "code" in query) {
      if (query.state !== localStorage.getItem("oauth-state")) {
        console.error("Invalid state!")
      } else {

        fetch("https://sbhs-timetabl.netlify.app/.netlify/functions/auth", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({code: query.code})
        })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("access_token", data["access_token"])
            localStorage.setItem("refresh_token", data["refresh_token"])
            fetch("https://sbhs-timetabl.netlify.app/.netlify/functions/api", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({api: "details/userinfo.json", token: localStorage.getItem("access_token")})
            })
              .then(response => response.json())
              .then(data => {setName(`${data["givenName"]} ${data["surname"]}`)})
              .catch(err => console.error(err))
          })

      }
    }
    else if (localStorage.getItem("access_token") !== null) {
      fetch("https://sbhs-timetabl.netlify.app/.netlify/functions/api", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({api: "details/userinfo.json", token: localStorage.getItem("access_token")})
      })
        .then(response => response.json())
        .then(data => {setName(`${data["givenName"]} ${data["surname"]}`)})
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <div className='App'>
      <button onClick={login}>Log in</button>
      <p>Hello, {name}!</p>
    </div>
  );
}


export default App;
