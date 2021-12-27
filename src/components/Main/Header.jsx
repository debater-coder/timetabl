import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default () => {
  const { logout } = useAuth();
  const { toggleColorMode } = useColorMode();


  return <Flex w={'100%'} justify={'right'} align={'center'} pt={'10px'} pb={'10px'}>
    <Menu>
      <MenuButton ml={3} mr={10} title={'Menu'}><Avatar name={'Hamzah Ahmed'} bg={'primary.100'}
                                                        size={'sm'} /></MenuButton>
      <MenuList>
        <MenuItem onClick={toggleColorMode}>
          Toggle dark mode
        </MenuItem>
        <Link to={"/profile"}><MenuItem>Profile</MenuItem></Link>
        <Link to={"/settings"}><MenuItem>Settings</MenuItem></Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>;
}