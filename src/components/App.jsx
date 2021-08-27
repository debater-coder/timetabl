import React from 'react';
import './App.css';
import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import Nav from './Nav';
import Hero from './Hero';
import useAuth from '../hooks/useAuth';
import config from '../config';

let App = () => {
  const {login} = useAuth(config)
  // const timetableBackground = useColorModeValue("gray.100", "gray.700")

  return (
    <Flex direction="column" align="center" maxW={{xl: "1200px"}} m="0 auto">
      <Nav />
      <Hero onCTAClick={login}>
        {/* TODO: Replace with demo */}
        <Image alt="A certain octocat" src="https://camo.githubusercontent.com/d8f7abcee9fdb2cded758cbff3b0b3036d4a4641bf58f0cb221aa3d4c1b17d93/68747470733a2f2f6f63746f6465782e6769746875622e636f6d2f696d616765732f79616b746f6361742e706e67"/>
      </Hero>
    </Flex>
  )

};

export default App;
