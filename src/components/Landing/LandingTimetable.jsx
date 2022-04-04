import { useQuery } from 'react-query';
import useCountdown from '../../hooks/useCountdown';
import { DateTime } from 'luxon';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Spinner, Text } from '@chakra-ui/react';
import DailyTimetable from '../Main/DailyTimetable';
import React, { useMemo } from 'react';

const fetch_bells = () => fetch('https://student.sbhs.net.au/api/timetable/bells.json')
  .then((res) => {
    if (!res.ok) {
      throw Error('Error fetching bells');
    }
    return res;
  })
  .then(res => res.json());

export default () => {
  // Query
  const { status, data, error } = useQuery('bells', fetch_bells);
  // Countdown
  const [timeLeft, setTime] = useCountdown(DateTime.now().plus({ 'minutes': 5 }).toMillis());

  let nextPeriod, periods;
  if (status === "success") {
    // Reformat bells
    periods = data.bells.filter(bell => DateTime.fromISO(bell.time) >= DateTime.fromISO('09:00')).map(
      bell => ({
        subject: bell.bell.length === 1 ? `Period ${bell.bell}` : bell.bell,
        isBreak: true,
        time: bell.time,
      }),
    );

    // Sort the periods
    periods.sort((a, b) => {
      return +DateTime.fromISO(a) - +DateTime.fromISO(b);
    });

    // Get next period
    for (const [index, period] of periods.entries()) {
      const periodTime = DateTime.fromISO(data.date + 'T' + period.time);
      const now = DateTime.now();
      if (now < periodTime) {
        nextPeriod = period;
        if (index > 0) {
          periods[index - 1].isCurrent = true;
        } else {
          periods[index].isCurrent = true;
        }
        break;
      }
    }
  }
  // Set time
  useMemo(
    () => {
      if (status === "success")
        setTime(DateTime.fromISO(data.date + 'T' + nextPeriod.time).toMillis())
    }, [timeLeft]
  )

  // Loading
  if (status === 'loading') {
    return <Spinner />;
  }

  // Error
  if (status === 'error') {
    return <Alert status='error'>
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>;
  }

  return <>
    <Text fontWeight={'bold'}>{data.day}{' '}{data.week}{data.weekType}</Text>
    <DailyTimetable
      nextPeriod={nextPeriod.subject}
      timeUntilNextPeriod={timeLeft}
      periods={periods}
      headingSize={'2xl'}
    />
  </>;
}