import React, { useContext } from 'react';
import Landing from './Landing/Landing';
import { AuthContext } from './AuthContext';
import Private from './Main/Main';
import FullScreenLoading from './FullScreenLoading';

let App = () => {
  const { loggedIn, login, isLoading } = useContext(AuthContext);
  return <FullScreenLoading isLoading={isLoading}>{loggedIn ? <Private /> :
    <Landing onCTAClick={login} />}</FullScreenLoading>;

};

export default App;
