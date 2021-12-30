import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import Header from '../Header';
import Routes from '../routes/Routes';

export default () => {
  const { pathname } = useLocation();
  return <Flex width='100vw' height='100vh' direction='row' textAlign='center' align='center'
               justify='space-between'>

    <Flex w='80px' h='100vh' direction={'column'} justify={'center'}>
      <Nav sidebar pathname={pathname} />
    </Flex>

    <Flex direction={'column'} h={'100%'} w={'100%'}>
      <Header />

      <Flex w={'100%'} overflowY={'auto'} h={'100%'} justify={'center'}>
        <Routes />
      </Flex>
    </Flex>

  </Flex>;
}