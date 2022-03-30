import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export default (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const timer = setTimeout(() => {
      const then = DateTime.fromMillis(time)
      setTimeLeft(then.diffNow().toMillis())
    }, 1000)

    return () => clearTimeout(timer)
  });

  return [timeLeft, setTime]
}