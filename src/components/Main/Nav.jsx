import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import { Calendar, House, Megaphone } from 'phosphor-react';
import React from 'react';

export default ({ pathname, sidebar }) => <>
  <Link to={'/calendar'}>
    <NavButton sidebar={sidebar} name={'Calendar'} active={pathname === '/calendar'} icon={Calendar} />
  </Link>
  <Link to={'/'}>
    <NavButton sidebar={sidebar} name={'Home'} active={pathname === '/'} icon={House} />
  </Link>
  <Link to={'/notices'}>
    <NavButton sidebar={sidebar} name={'Notices'} icon={Megaphone} mirrored active={pathname === '/notices'} />
  </Link>
</>