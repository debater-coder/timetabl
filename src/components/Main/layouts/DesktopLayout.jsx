import React, { useContext } from 'react';
import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/all';
import Nav from '../Nav';
import Header from '../Header';
import Routes from '../routes/Routes';
import { useAuth } from '../../../hooks/useAuth';

export default () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const iconColor = useColorModeValue('black', 'white');
  const icon = useColorModeValue(<FaMoon />, <FaSun />);
  const { toggleColorMode } = useColorMode();

  return <Flex width='100vw' height='100vh' direction='row' textAlign='center' align='center'
               justify='space-between'>

    <Flex w='80px' h='100vh' direction={'column'} justify={'center'}>
      <Nav sidebar pathname={pathname} />
    </Flex>

    <Flex direction={'column'} h={'100%'} w={'100%'}>
      <Header />

      <Flex w={'100%'} overflowY={'scroll'} h={'100%'} justify={'center'}>
        <Routes />
      </Flex>
    </Flex>

  </Flex>;
}