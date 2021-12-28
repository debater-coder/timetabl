import Nav from './Nav';
import Hero from './Hero';
import { Box, ButtonGroup, Divider, Flex, IconButton, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import DailyTimetable from '../Main/DailyTimetable';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { chakra } from '@chakra-ui/react';
import { Student } from 'phosphor-react';


export default ({ onCTAClick }) => {

  const timetableColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('primary.700', 'primary.200');

  return <>
    <Flex direction='column' align='center' maxW={{ xl: '1200px' }} m='0 auto'>
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
    </Flex>
    <Divider/>
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{
        base: '4',
        md: '8',
      }}
    >
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Image src={"favicon.ico"} boxSize={"40px"} />
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton as="a" href="https://www.sydneyboyshigh.com/" aria-label="Student Portal" icon={<Student size={20} weight="fill" />} />
            <IconButton as="a" href="https://github.com/debater-coder/timetabl" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
          </ButtonGroup>
        </Stack>
        <Text
          alignSelf={{
            base: 'center',
            sm: 'start',
          }}
        >
          <chakra.span
            color={textColor}
            fontWeight={"medium"}
            display={"inline"}
          >Timetabl </chakra.span>
          is made by Hamzah Ahmed
        </Text>
      </Stack>
    </Box>
  </>;
}