import React from 'react';
import MobileLayout from './layouts/MobileLayout';
import { useBreakpointValue } from '@chakra-ui/react';


export default () => {
  const isMobile = useBreakpointValue({base: "mobile", md: ""}) === "mobile"
  return isMobile ? <MobileLayout /> : "Desktop";
}