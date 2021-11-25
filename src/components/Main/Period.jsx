import { Flex, Text, useToken } from '@chakra-ui/react';
import React from 'react';

export default () => {
  const [primary] = useToken('colors', ['primary.100']);

  return <Flex direction={'row'} bg={primary + "20"}  mb={3} p={3} borderRadius={5} boxShadow={"sm"}>
    <Flex direction={'column'} textAlign={'left'} mr={10}><Text>7 Geography E</Text>
      <Text fontSize={'xs'}><b>at 9:30</b> with T Davis Frank</Text>
    </Flex>

    <Flex fontSize={'2xl'}>507</Flex>
  </Flex>;
}