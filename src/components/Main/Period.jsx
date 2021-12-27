import { chakra, Flex, Text, useToken } from '@chakra-ui/react';
import React from 'react';

export default ({ subject, time, teacher, room, isCurrent, isBreak, roomChanged, teacherChanged, timeChanged }) => {
  const [primary] = useToken('colors', ['primary.100']);

  return <Flex
    w={'250px'}
    direction={'row'}
    bg={primary + (isCurrent ? '20' : '10')}
    justify={'space-between'}
    align={'center'}
    mb={3}
    p={3}
    borderRadius={5}
    boxShadow={isCurrent ? 'md' : 'sm'}
  >
    <Flex
      direction={'column'}
      textAlign={'left'}
      mr={10}
      fontSize={'md'}
    >
      <Text>{subject}</Text>
      {
        !isBreak
          ?
          <Text fontSize={'xs'}>
            at
            <chakra.b textColor={timeChanged ? 'primary.100' : undefined}> {time} </chakra.b>
            with
            <chakra.span textColor={teacherChanged ? 'primary.100' : undefined}> {teacher}</chakra.span>
          </Text>
          :
          <></>
      }
    </Flex>
    <Flex fontSize={isBreak ? 'xl' : '2xl'} textAlign={'right'}>
      {
        isBreak
          ?
          <chakra.span textColor={timeChanged ? 'primary.100' : undefined}>{time}</chakra.span>
          :
          <chakra.span textColor={roomChanged ? 'primary.100' : undefined}>{room}</chakra.span>
      }
    </Flex>
  </Flex>;
}