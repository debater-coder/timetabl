import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export default (initialTime) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setTimeout(() => {
      const then = DateTime.fromMillis(time);
      const dur = then.diffNow();

      if (dur.toMillis() >= 60 * 60 * 1000) {
        setTimeLeft(dur.toFormat('hh:mm:ss'));
      } else {
        setTimeLeft(dur.toFormat('mm:ss'));
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return [timeLeft, setTime];
}