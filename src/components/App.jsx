import React from 'react';
import './App.css';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Nav from './Nav';
import Hero from './Hero';

let App = () => {
  // This is the official Chakra Example
  // const { toggleColorMode } = useColorMode()
  const timetableBackground = useColorModeValue("gray.100", "gray.700")
  //
  // return (
  //   <Flex height="100vh" alignItems="center" justifyContent="center">
  //     <Flex direction="column" background={formBackground} p={12} rounded={6}>
  //       <Heading mb={6}>Login</Heading>
  //       <Input placeholder="lazar@chakra-ui.com" variant="filled" mb={3} type="email" />
  //       <Input placeholder="********" variant="filled" mb={6} type="password" />
  //       <Button colorScheme="teal" mb={3}>Log in</Button>
  //       <Button onClick={toggleColorMode}>Toggle Colour Mode</Button>
  //     </Flex>
  //   </Flex>
  // );
  return (
    <Flex direction="column" align="center" maxW={{xl: "1200px"}} m="0 auto">
      <Nav />
      <Hero>
        {/* TODO: Replace with demo */}
        {/*<img src="https://camo.githubusercontent.com/d8f7abcee9fdb2cded758cbff3b0b3036d4a4641bf58f0cb221aa3d4c1b17d93/68747470733a2f2f6f63746f6465782e6769746875622e636f6d2f696d616765732f79616b746f6361742e706e67"/>*/}
        <Flex direction="column" background={timetableBackground} p={10} rounded={6} align="center" w="80%" margin="auto">
          <Text mb={-3}><Box fontSize="xl" as="span">Period 2</Box> <Box fontSize="sm" as="span">in</Box></Text>
          <Text fontSize="5xl">30:00</Text>
        </Flex>
      </Hero>
    </Flex>
  )

};

export default App;
