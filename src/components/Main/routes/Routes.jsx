import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import Calendar from './Calendar';
import News from './News';

export default () => <Routes>
  <Route path={'/'} element={<Home />} />
  <Route path={'/calendar'} element={<Calendar />} />
  <Route path={'/news'} element={<News />} />
</Routes>