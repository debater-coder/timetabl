import React from 'react';
import MobileLayout from './layouts/MobileLayout';
import { useBreakpointValue } from '@chakra-ui/react';
import DesktopLayout from './layouts/DesktopLayout';

export default () => {
  const isMobile = useBreakpointValue({ base: '', md: 'notMobile' }) !== 'notMobile';
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}