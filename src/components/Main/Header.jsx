import {
  Avatar,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDataManager } from '../../hooks/useDataManager';
import { useBanner } from '../../hooks/useBanner';

export default () => {
  const { logout } = useAuth();
  const { toggleColorMode } = useColorMode();
  const { banner, setBanner } = useBanner();
  const { name } = useDataManager();
  const isMobile = useBreakpointValue({ base: '', md: 'notMobile' }) !== 'notMobile';
  const [prompt, setPrompt] = useState();
  const [installed, setInstalled] = useState(false);
  const installButton = useRef(null);

  if (installButton.current) {
    installButton.current.addEventListener('click', async () => {
      prompt.prompt();
      let result = await prompt.userChoice;
      if (result && result.outcome === 'accepted') {
        setInstalled(true);
      }
      setPrompt(null);
    });
  }

  const beforeInstallPrompt = evt => {
    evt.preventDefault();
    setPrompt(evt);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
  }, []);

  return <Flex direction={'column'} w={'100%'}>
    <Flex w={'100%'} justify={'space-between'} align={'center'} p={'10px'}>
      <Heading size={'sm'}>Term 4 Week 5A</Heading>
      {isMobile ? <></> : <Flex>{banner}</Flex>}
      <Flex>
        {
          !!prompt && !installed ?
            <Tooltip placement={'left'}
                     label={'Installing Timetabl takes almost no storage or data, and allows you to have the full Timetabl experience.'}>
              <Button colorScheme={'primary'} ref={installButton}>Install</Button>
            </Tooltip>
            : <></>
        }
        <Menu>
          <MenuButton ml={3} mr={3} title={'Menu'}><Avatar name={name} bg={'primary.100'}
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
      </Flex>
    </Flex>
    <Flex direction={'row'} m={'auto'}>{isMobile ? banner : <></>}</Flex>
  </Flex>;
}