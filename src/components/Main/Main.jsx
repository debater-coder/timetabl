import React, { useContext } from 'react';
import { Box, Button, Center, Flex, HStack, Link, Square, Text, VStack } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { useQuery } from 'urql';
import FullScreenLoading from '../FullScreenLoading';

export default () => {
  const {logout} = useContext(AuthContext)

  // language=GraphQL
  let query = `
      query {
          user {
              givenName
              studentId
              rollClass
              email
              totalPoints
          }
          today {
              weekType
              week
          }
      }
  `;
  const [result] = useQuery({
    query
  })

  const { data, fetching, error } = result

  if (error) console.error(error)

  if (fetching || error) return <FullScreenLoading/>

  const {
    user: { totalPoints, givenName, rollClass, email, studentId } ,
    today: {
      weekType,
      week
    }
  } = data;

  return <Flex width="100vw" height="100vh" direction="column" textAlign="center" align="center" justify="space-around">
    <Button onClick={logout}>Logout</Button>
    {fetching || error ? "" :
      <>
        <div>
          <Text>Hello, {givenName}.</Text>
          <Text>Your student id is {studentId}</Text>
          <Text>You are in class {rollClass}</Text>
          <Text>Your email address is <Link color="secondary.300" href={"mailto:" + email}>{email}</Link></Text>
          <Text>You have {totalPoints} award scheme point{totalPoints === 1 ? "" : "s"}</Text>
        </div>
      </>
    }
  </Flex>
}