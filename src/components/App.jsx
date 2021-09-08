import React, { useContext } from 'react';
import './App.css';
import Landing from './Landing';
import { AuthContext } from './AuthContext';
import Private from './Private';
import { Fade, Flex, Spinner } from '@chakra-ui/react';

let App = () => {
  const { loggedIn, login, isLoading } = useContext(AuthContext)
  return isLoading
    ?
    <Flex alignItems='center' justifyContent='center' height="100vh"><Fade out={isLoading}><Spinner size="xl"/></Fade></Flex> // True
    :
    (loggedIn ? <Private /> : <Landing onCTAClick={login} />) // False

};

export default App;
