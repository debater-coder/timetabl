import contextualise from '../contextualise/src/contextualise';
import { useImmer } from 'use-immer';
import { useAuth } from './useAuth';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useBanner } from './useBanner';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';

const fetchPortalAuthenticated = async ({ queryKey }) => {
  const res = await fetch(
    "https://student.sbhs.net.au/api/"
    + queryKey[1]
    + "?access_token="
    + localStorage.getItem("access_token")
  )

  if (res.status === 401) {
    throw new Error("401")
  }

  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }

  return await res.json()
}

const useDataManager = () => {
  const [data, setData] = useImmer({
    name: null,
    studentID: null,
    email: null,
    role: null,
    department: null,
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

  const {status, data: raw, error} = useQuery(["portal", "details/userinfo.json"], fetchPortalAuthenticated)
  const {setBanner} = useBanner()
  const {setShouldLogin} = useAuth()

  useMemo(
    () => {
      if (status === "success") {
        setData(draft => {
          // noinspection JSValidateTypes
          draft.name = raw["givenName"] + " " + raw["surname"]
          draft.studentID = raw["studentId"]
          draft.email = raw["email"]
          draft.role = raw["role"]
          draft.department = raw["department"]
        })
      }
      if (status === "error") {

        if (error.message === "401") {
          setShouldLogin(true)
        } else {
          setBanner(
            <Alert status={'error'} rounded={5} variant={'left-accent'}>
              <AlertIcon />
              <AlertTitle>An error occured while fetching details/userinfo.json.</AlertTitle>
              <AlertDescription>
                Error message: {error.message}
              </AlertDescription>
            </Alert>
          )
        }

      }
    }, [status, data, error]
  )

  return data;
};

let [useDataManagerGlobal, DataProvider] = contextualise(useDataManager, [], undefined);

export { DataProvider, useDataManagerGlobal as useDataManager };