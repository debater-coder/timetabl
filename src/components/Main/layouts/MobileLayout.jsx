import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import Header from '../Header';
import Routes from '../routes/Routes';

export default () => {
  const { pathname } = useLocation();

  return <Flex width='100vw' height='100vh' direction='column' textAlign='center' align='center'
               justify='space-between'>
    <Header />
    <Flex w={'100vw'} h={'100%'} overflowY={"scroll"} justify={'center'}>
      <Routes />
    </Flex>

    <Flex w='100%' h='80px' justify={'space-evenly'}>
      <Nav pathname={pathname} />
    </Flex>
  </Flex>;
}