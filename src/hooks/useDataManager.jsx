import contextualise from '../contextualise/src/contextualise';
import { useImmer } from 'use-immer';
import { useAuth } from './useAuth';
import { useQuery } from 'urql';
import React, { useEffect } from 'react';
import { Alert, AlertIcon, AlertTitle, Button, useToast } from '@chakra-ui/react';
import lodash from "lodash"

// language=GraphQL
const query = `
    query {
        user {
            givenName
            surname
            studentId
        }
    }
`

const useDataManager = () => {
  const [data, setData] = useImmer({
    name: null,
    studentID: null,
    serverTimezone: 36000,
    periods: [
      {
        subject: 'Geography',
        time: '09:30',
        room: 507,
        teacher: 'M Jas',
        roomChanged: true,
        teacherChanged: true,
      },
      {
        subject: 'Music',
        time: '10:30',
        room: 214,
        teacher: 'Ms Lim',
        timeChanged: true,
        isCurrent: true,
      },
      {
        subject: 'Recess',
        isBreak: true,
        time: '11:15',
      },
      {
        subject: 'Visual Arts',
        time: '11:45',
        room: 707,
        teacher: 'E Apostiledes',
      },
      {
        subject: 'Lunch',
        isBreak: true,
        time: '12:40',
      },
      {
        subject: 'English',
        time: '12:30',
        room: 701,
        teacher: 'D Taylor',
        teacherChanged: true,
        roomChanged: true,
      },
      {
        subject: 'Design Technology',
        time: '14:40',
        room: 501,
        teacher: 'L Chapple',
        teacherChanged: true,
      },
    ],
    shouldDisplayVariations: true,
  });

  const { loggedIn, login, isLoading, refresh, setShouldLogin } = useAuth();

  const [{ data: newData, error, fetching }, reexecuteQuery] = useQuery({
    query,
    pause: isLoading || !loggedIn
  })


  const handleErrors = error => {
    let errorCode = error.graphQLErrors[0].message.split(":")[0]
    if (errorCode === "0x03") {
      refresh().then(response => {
        if (!response.ok) {
          setShouldLogin(true)
        } else {
          reexecuteQuery()
        }
      })
    } else {
      throw error
    }

  }
  useEffect(
    () => {
      if (error) handleErrors(error);
    }, [error]
  )
  useEffect(() => {
    if (!fetching && !isLoading && loggedIn && !error) {
      setData(draft => {
        const { givenName, studentId, surname } = newData.user;
        draft.studentID = studentId
        draft.name = `${givenName} ${surname}`
      })
    }
  }, [newData])


  return data
};

let [useDataManagerGlobal, DataProvider] = contextualise(useDataManager, [], undefined);

export { DataProvider, useDataManagerGlobal as useDataManager };