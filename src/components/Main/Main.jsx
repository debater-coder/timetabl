import React, { useContext } from 'react';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home';
import News from './News';
import Calendar from './Calendar';

export default () => {
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation()
  console.log(pathname)
  // // language=GraphQL
  // let query = `
  //     query {
  //         user {
  //             givenName
  //             studentId
  //             rollClass
  //             email
  //             totalPoints
  //         }
  //         today {
  //             weekType
  //             week
  //         }
  //     }
  // `;
  // const [result] = useQuery({
  //   query,
  // });
  //
  // const { data, fetching, error } = result;
  //
  // if (error) console.error(error);
  //
  // if (fetching || error) return <FullScreenLoading />;
  //
  // const {
  //   user: { totalPoints, givenName, rollClass, email, studentId },
  //   today: {
  //     weekType,
  //     week,
  //   },
  // } = data;
  //
  return <Flex width='100vw' height='100vh' direction='column' textAlign='center' align='center' justify='space-between'>
      <Button onClick={logout} mt={10}>Logout</Button>

      <Switch>
        <Route path={"/calendar"}>
          <Calendar />
        </Route>
        <Route path={"/news"}>
          <News />
        </Route>
        <Route path={"/"}>
          <Home />
        </Route>
      </Switch>

      <HStack spacing={5} mb={50}>
        <Link to="/calendar">
          <Button
            variant={pathname === "/calendar" ? "solid" : "ghost"}
            colorScheme={pathname === "/calendar" ? "secondary" : "gray"}
          >
            Calendar
          </Button>
        </Link>

        <Link to="/">
          <Button
            variant={pathname === "/" ? "solid" : "ghost"}
            colorScheme={pathname === "/" ? "secondary" : "gray"}
          >
            Home
          </Button>
        </Link>

        <Link to="/news">
          <Button
            variant={pathname === "/news" ? "solid" : "ghost"}
            colorScheme={pathname === "/news" ? "secondary" : "gray"}
          >
            News
          </Button>
        </Link>
      </HStack>
  </Flex>;
}