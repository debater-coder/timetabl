import contextualise from '../contextualise/src/contextualise';
import { useImmer } from 'use-immer';
import { useAuth } from './useAuth';
import React, { useEffect } from 'react';

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

  const { loggedIn, login, isLoading, setShouldLogin } = useAuth();


  return data
};

let [useDataManagerGlobal, DataProvider] = contextualise(useDataManager, [], undefined);

export { DataProvider, useDataManagerGlobal as useDataManager };