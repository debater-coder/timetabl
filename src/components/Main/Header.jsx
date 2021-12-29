import { Avatar, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDataManager } from '../../hooks/useDataManager';
import { useBanner } from '../../hooks/useBanner';

export default ({children}) => {
  const { logout } = useAuth();
  const { toggleColorMode } = useColorMode();
  const { banner, setBanner } = useBanner()
  const { name } = useDataManager();

  return <Flex w={'100%'} justify={'space-between'} align={'center'} p={"10px"}>
    <Heading size={"sm"}>Term 4 Week 5A</Heading>
    <Flex>{banner}</Flex>
    <Menu>
      <MenuButton ml={3} mr={10} title={'Menu'}><Avatar name={name} bg={'primary.100'}
                                                        size={'sm'} /></MenuButton>
      <MenuList>
        <MenuItem onClick={toggleColorMode}>
          Toggle dark mode
        </MenuItem>
        <Link to={'/profile'}><MenuItem>Profile</MenuItem></Link>
        <Link to={'/settings'}><MenuItem>Settings</MenuItem></Link>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>;
}