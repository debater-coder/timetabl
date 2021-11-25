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

  // Menu items:
  // - Logout
  // - Toggle Dark mode
  // - Settings

  return <Flex w={'100%'} justify={'right'} align={"center"} pt={"10px"}>
    <Menu>
      <MenuButton ml={3} mr={10} title={"Menu"}><Avatar name={"Hamzah Ahmed"} bg={"primary.100"} size={"sm"} /></MenuButton>
      <MenuList>
        <MenuItem>Logout</MenuItem>
        <MenuItem onClick={toggleColorMode}>
          Toggle dark mode
        </MenuItem>
        <MenuItem>Settings</MenuItem>
      </MenuList>
    </Menu>
  </Flex>;
}