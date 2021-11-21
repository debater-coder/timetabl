import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Button, Flex, HStack, Spacer } from '@chakra-ui/react';
import Calendar from '../routes/Calendar';
import News from '../routes/News';
import Home from '../routes/Home';

export default () => {
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();

  return <Flex width='100vw' height='100vh' direction='column' textAlign='center' align='center'
               justify='space-between'>
    <Button onClick={logout} mt={10}>Logout</Button>
    <Routes>
      <Route path='calendar' element={<Calendar />} />
      <Route path='news' element={<News />} />
      <Route path='/' element={<Home />} />
    </Routes>

    <Flex bgColor={"pink"} w="100%" pb={50} pt={25}>
      <Spacer />
      <Link to='/calendar'>
        <Button
          variant={pathname === '/calendar' ? 'solid' : 'ghost'}
          colorScheme={pathname === '/calendar' ? 'secondary' : 'gray'}
        >
          Calendar
        </Button>
      </Link>
      <Spacer/>
      <Link to='/'>
        <Button
          variant={pathname === '/' ? 'solid' : 'ghost'}
          colorScheme={pathname === '/' ? 'secondary' : 'gray'}
        >
          Home
        </Button>
      </Link>

      <Spacer/>
      <Link to='/news'>
        <Button
          variant={pathname === '/news' ? 'solid' : 'ghost'}
          colorScheme={pathname === '/news' ? 'secondary' : 'gray'}
        >
          News
        </Button>
      </Link>
      <Spacer />
    </Flex>
  </Flex>;
}