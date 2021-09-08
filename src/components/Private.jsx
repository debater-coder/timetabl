import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

export default () => {
  const screenSize = useBreakpointValue({base: "base", md: "md", lg: "lg", xl: "xl"})
  return screenSize
}