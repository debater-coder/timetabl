import React, { useContext } from 'react';
import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { AuthContext } from './AuthContext';

export default () => {
  const {logout} = useContext(AuthContext)
  return <Button onClick={logout}>Log out</Button>
}