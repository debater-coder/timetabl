import React, { useContext } from 'react';
import Landing from './Landing/Landing';
import Main from './Main/Main';
import FullScreenLoading from './FullScreenLoading';
import { useAuth } from '../hooks/useAuth';

let App = () => {
  const { loggedIn, login, isLoading } = useAuth();
  return <FullScreenLoading isLoading={isLoading}>{loggedIn ? <Main /> :
    <Landing onCTAClick={login} />}</FullScreenLoading>;

};

export default App;
