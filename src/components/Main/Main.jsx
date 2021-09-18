import React, { useContext } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';

export default () => {
  const {logout} = useContext(AuthContext)
  return <Flex width="100vw" height="100vh" direction="column" align="center" justify="space-around">
    <Button onClick={logout}>Logout</Button>
    <Text>TEXT TEXT TEXT</Text>
  </Flex>
}