import React, { useEffect, useState } from 'react';
import './App.css';
import useAuth from '../auth/useAuth';
import config from '../config';

let App = () => {
  let { loggedIn, authState, login, logout, apiRequest } = useAuth(config);
  let [name, setName] = useState('');
  let [points, setPoints] = useState(-1);

  useEffect(() => {
    if (loggedIn) {
      // On login
      apiRequest('details/userinfo.json').then((data) =>
        setName(data['givenName'] + ' ' + data['surname']),
      );
      apiRequest('details/participation.json').then((data) =>
        setPoints(data.slice(-1)[0]['points']),
      );
    } else {
      // On logout
      setPoints(-1);
      setName('');
    }
  }, [loggedIn]);

  return (
    <div className="App">
      {authState ? (
        loggedIn ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <button onClick={login}>Log in</button>
        )
      ) : (
        <p>Loading...</p>
      )}

      {name !== '' ? <p>Hello, {name}!</p> : ''}
      {points !== -1 ? <p>You have {points} award scheme points!</p> : ''}
    </div>
  );
};

export default App;
