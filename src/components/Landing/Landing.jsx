import Nav from './Nav';
import Hero from './Hero';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import DailyTimetable from '../Main/DailyTimetable';


export default ({ onCTAClick }) => {

  const timetableColor = useColorModeValue('gray.100', 'gray.700');

  return <Flex direction='column' align='center' maxW={{ xl: '1200px' }} m='0 auto'>
    <Nav />
    <Hero onCTAClick={onCTAClick}>
      <Flex
        bgColor={timetableColor}
        p={10}
        rounded={20}
        align='center'
        justifyContent='center'
        direction='column'
      >
        <DailyTimetable nextPeriod={'Roll call'} timeUntilNextPeriod={'00:05:00'} periods={[
          {
            isBreak: true,
            subject: 'Period 1',
            time: '9:05',
          },
          {
            isBreak: true,
            subject: 'Period 2',
            time: '10:10',
            isCurrent: true,
          },
          {
            isBreak: true,
            subject: 'Recess',
            time: '11:10',
          },
          {
            isBreak: true,
            subject: 'Period 3',
            time: '12:10',
          },
          {
            isBreak: true,
            subject: 'Lunch',
            time: '1:10',
          },
          {
            isBreak: true,
            subject: 'Period 4',
            time: '2:10',
          },
          {
            isBreak: true,
            subject: 'Period 5',
            time: '3:10',
          },
        ]} headingSize={'2xl'} />
      </Flex>
    </Hero>
  </Flex>;
}