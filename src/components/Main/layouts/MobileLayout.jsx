import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Button, ButtonGroup, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/all';
import Nav from '../Nav';

export default () => {
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();

  const iconColor = useColorModeValue('black', 'white');
  const icon = useColorModeValue(<FaMoon />, <FaSun />);
  const { toggleColorMode } = useColorMode();


  return <Flex width='100vw' height='100vh' direction='column' textAlign='center' align='center'
               justify='space-between'>

    <Flex w={'100vw'} justify={'space-around'} pb='10px'>
      <ButtonGroup isAttached mt={10} variant={'outline'}>
        <Button onClick={logout}>Logout</Button>
        <IconButton onClick={toggleColorMode} aria-label='Dark mode' color={iconColor} icon={icon} mr={1} />
      </ButtonGroup>
    </Flex>

    <Flex w={'100vw'} h={'100%'} justify={'center'}>
      <Routes>
        <Route path={'/'} element={'Home'} />
        <Route path={'/calendar'} element={'Calendar'} />
        <Route path={'/news'} element={'News'} />
      </Routes>
    </Flex>

    <Flex w='100%' h='80px' justify={'space-evenly'}>
      <Nav pathname={pathname} />
    </Flex>
  </Flex>;
}