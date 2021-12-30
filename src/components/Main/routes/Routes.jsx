import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import Calendar from './Calendar';
import Notices from './Notices';
import Profile from './Profile';
import Settings from './Settings';

export default () => <Routes>
  <Route path={'/'} element={<Home />} />
  <Route path={'/calendar'} element={<Calendar />} />
  <Route path={'/notices'} element={<Notices />} />
  <Route path={'/profile'} element={<Profile />} />
  <Route path={'/settings'} element={<Settings />} />
</Routes>