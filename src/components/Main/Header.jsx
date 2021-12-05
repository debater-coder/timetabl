import {
  Avatar,
  Button,
  ButtonGroup,
  Flex, Icon,
  IconButton, Menu,
  MenuButton, MenuItem, MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { FaMoon, FaSun } from 'react-icons/all';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default () => {
  const { logout } = useContext(AuthContext);
  const { toggleColorMode } = useColorMode();


  return <Flex w={'100%'} justify={'right'} align={"center"} pt={"10px"} pb={"10px"}>
    <Menu>
      <MenuButton ml={3} mr={10} title={"Menu"}><Avatar name={"Hamzah Ahmed"} bg={"primary.100"} size={"sm"} /></MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={toggleColorMode}>
          Toggle dark mode
        </MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
      </MenuList>
    </Menu>
  </Flex>;
}