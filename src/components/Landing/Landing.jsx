import Nav from './Nav';
import Hero from './Hero';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const query = `
  query {
    bells(date: "2021-08-30") {
        bells {
            bell
            time
        }
    }
  }
`;

export default ({ onCTAClick }) => {

  const timetableColor = useColorModeValue('gray.100', 'gray.700');

  return <Flex direction='column' align='center' maxW={{ xl: '1200px' }} m='0 auto'>
    <Nav />
    <Hero onCTAClick={onCTAClick}>
      <Flex
        bgColor={timetableColor}
        height={400}
        rounded={20}
        align='center'
        justifyContent='center'
        direction='column'
      >
        BLA BLA BLA
      </Flex>
    </Hero>
  </Flex>;
}