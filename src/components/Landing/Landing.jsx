import Nav from './Nav';
import Hero from './Hero';
import {
  Alert, AlertDescription, AlertIcon, AlertTitle,
  Box,
  ButtonGroup,
  chakra,
  Divider,
  Flex,
  IconButton,
  Image, Link, Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import DailyTimetable from '../Main/DailyTimetable';
import { FaGithub } from 'react-icons/fa';
import { Student } from 'phosphor-react';
import { DateTime, Duration } from 'luxon';
import useCountdown from '../../hooks/useCountdown';
import { useQuery } from 'react-query';

const fetch_bells = () => fetch("https://student.sbhs.net.au/api/timetable/bells.json")
  .then((res) => {
    if (!res.ok) {
      throw Error("Oh dear!")
    }
    return res
  })
  .then(res => res.json())

const LandingTimetable = () => {
  const [timeLeft, setTime] = useCountdown(DateTime.now().plus({"hours": 1.001}).toMillis())

  const { status, data, error } = useQuery("bells", fetch_bells)

  useEffect(() => {
    if (status === "success") {
      let nextPeriod
      for (const period of periods) {
        const periodTime = DateTime.fromISO(data.date + "T" + period.time)
        const now = DateTime.now()
        if (now < periodTime) {
          nextPeriod = period
          break
        }
      }

      setTime(DateTime.fromISO(data.date + "T" + nextPeriod.time).toMillis())
    }

  }, [data])

  if (status === "loading") {
    return <Spinner />
  }

  if (status === "error") {
    return <Alert status='error'>
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  }

  let periods = data.bells.filter(bell => DateTime.fromISO(bell.time) >= DateTime.fromISO("09:00")).map(
    bell => ({
      subject: bell.bell.length === 1 ? `Period ${bell.bell}` : bell.bell,
      isBreak: true,
      time: bell.time
    })
  )

  // Sort the periods
  periods.sort((a, b) => {
    return +DateTime.fromISO(a) - +DateTime.fromISO(b)
  })


  let nextPeriod
  for (const [index, period] of periods.entries()) {
    const periodTime = DateTime.fromISO(data.date + "T" + period.time)
    const now = DateTime.now()
    if (now < periodTime) {
      nextPeriod = period
      if (index > 0) {
        periods[index - 1].isCurrent = true
      } else {
        periods[index].isCurrent = true
      }
      break
    }
  }

  return <DailyTimetable
    nextPeriod={nextPeriod.subject}
    timeUntilNextPeriod={timeLeft}
    periods={periods}
    headingSize={"2xl"}
  />
}

export default ({ onCTAClick }) => {

  const timetableColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('primary.700', 'primary.200');

  // const fakePeriods = [
  //   {
  //     subject: "Period 1",
  //     time: "9:05",
  //     isBreak: true,
  //     isCurrent: true
  //   },
  //   {
  //     subject: "Period 2",
  //     time: "10:10",
  //     isBreak: true
  //   },
  //   {
  //     subject: "Recess",
  //     time: "11:10",
  //     isBreak: true,
  //     supersmall: true
  //   },
  //   {
  //     subject: "Period 3",
  //     time: "11:30",
  //     isBreak: true
  //   },
  //   {
  //     subject: "Lunch",
  //     time: "12:30",
  //     isBreak: true,
  //     supersmall: true
  //   },
  //   {
  //     subject: "Period 4",
  //     time: "13:10",
  //     isBreak: true
  //   },
  //   {
  //     subject: "Period 5",
  //     time: "14:15",
  //     isBreak: true
  //   },
  // ]

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
          <LandingTimetable />
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
          <Link
            color={textColor}
            fontWeight={'medium'}
            display={'inline'}
            href={"/"}
          >Timetabl
          </Link>
          &nbsp;is made by Hamzah Ahmed
        </Text>
      </Stack>
    </Box>
  </>;
}