import Nav from './Nav';
import Hero from './Hero';
import {
  Box,
  ButtonGroup,
  chakra,
  Divider,
  Flex,
  IconButton,
  Image, Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import DailyTimetable from '../Main/DailyTimetable';
import { FaGithub } from 'react-icons/fa';
import { Student } from 'phosphor-react';
import { useQuery } from 'urql';
import { DateTime } from 'luxon';

// language=GraphQL
const query = `
  query {
      bells(date: "2021-08-30") {
          bells {
              bell
              time
          }
      }
  }
`

export default ({ onCTAClick }) => {

  const timetableColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('primary.700', 'primary.200');
  const [result, reexecuteQuery] = useQuery({
    query,
  })

  const {data, fetching, error} = result;
  if (error) console.error(error)

  let testing = false;
  testing = true; // Remove after testing
  console.log(process.env.SNOWPACK_PUBLIC_TEST_THING)

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
          {
            fetching || testing ?
            <Spinner />
            :
            <DailyTimetable
              nextPeriod={'Roll call'}
              timeUntilNextPeriod={'00:05:00'}
              periods={
                data.bells.bells.filter(bell => DateTime.fromISO(bell.time) >= DateTime.fromISO("09:00")).map(
                  bell => {
                    let subject = bell.bell
                    let time = bell.time
                    if (subject.length === 1) {
                      subject = `Period ${subject}`
                    }
                    return {
                      subject,
                      time,
                      isBreak: true
                    }
                  }
                )
              }
              headingSize={'2xl'} />
          }
        </Flex>
      </Hero>
    </Flex>
    <Divider />
    <Box
      as='footer'
      role='contentinfo'
      mx='auto'
      maxW='7xl'
      py='12'
      px={{
        base: '4',
        md: '8',
      }}
    >
      <Stack>
        <Stack direction='row' spacing='4' align='center' justify='space-between'>
          <Image src={'favicon.ico'} boxSize={'40px'} />
          <ButtonGroup variant='ghost' color='gray.600'>
            <IconButton as='a' href='https://www.sydneyboyshigh.com/' aria-label='Student Portal'
                        icon={<Student size={20} weight='fill' />} />
            <IconButton as='a' href='https://github.com/debater-coder/timetabl' aria-label='GitHub'
                        icon={<FaGithub fontSize='20px' />} />
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
            fontWeight={'medium'}
            display={'inline'}
          >Timetabl&nbsp;
          </chakra.span>
          is made by Hamzah Ahmed
        </Text>
      </Stack>
    </Box>
  </>;
}