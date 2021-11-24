import { Link } from 'react-router-dom';
import NavButton from './layouts/NavButton';
import { Calendar, House, NewspaperClipping } from 'phosphor-react';
import React from 'react';

export default ({ pathname, sidebar }) => <>
  <Link to={'/calendar'}>
    <NavButton sidebar={sidebar} name={'Calendar'} active={pathname === '/calendar'} icon={Calendar} />
  </Link>
  <Link to={'/'}>
    <NavButton sidebar={sidebar} name={'Home'} active={pathname === '/'} icon={House} />
  </Link>
  <Link to={'/news'}>
    <NavButton sidebar={sidebar} name={'News'} icon={NewspaperClipping} active={pathname === '/news'} />
  </Link>
</>