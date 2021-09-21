import React, { useContext } from 'react';
import { Button, Flex, HStack } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { useLocation } from 'react-router-dom';
// import { useQuery } from 'urql';
// import FullScreenLoading from '../FullScreenLoading';

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
      <HStack spacing={5} mb={50}>
        <Button variant="solid" colorScheme="secondary">Home</Button>
        <Button variant="ghost">Calendar</Button>
        <Button variant="ghost">News</Button>
      </HStack>
  </Flex>;
}