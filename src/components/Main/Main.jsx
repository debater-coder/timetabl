import React, { useContext, useState } from 'react';
import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { useQuery } from 'urql';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

export default () => {
  const {logout} = useContext(AuthContext)
  const [date, setDate] = useState(new Date())
  const [result, reexecuteQuery] = useQuery({
    query: `
        query {
            user {
                givenName
                studentId
                rollClass
                email
                totalPoints
            }
            bells(date: "2021-08-30") {
                serverTimezone
            }
        }
    `
  })

  const { data, fetching, error } = result

  if (fetching) console.log("Loading")
  else if (error) console.error(error)

  return <Flex width="100vw" height="100vh" direction="column" textAlign="center" align="center" justify="space-around">
    <Button onClick={logout}>Logout</Button>
    {fetching || error ? "" :
      <>
        <div>
          <Text>Hello {data.user.givenName}.</Text>
          <Text>Your student id is {data.user.studentId}</Text>
          <Text>You are in class {data.user.rollClass}</Text>
          <Text>Your email address is <Link color="secondary.300" href={"mailto:" + data.user.email}>{data.user.email}</Link></Text>
          <Text>You have {data.user.totalPoints} award scheme points</Text>
        </div>
        <div>
          <Text textAlign="left">See the bells for the date: ⚠ DOSEN'T ACTUALLY WORK ⚠</Text>
          <SingleDatepicker onDateChange={setDate} date={date} />
          <Button colorScheme="primary" mt={4} onClick={() => {setDate(new Date())}}>Reset to today</Button>
        </div>
      </>
    }
  </Flex>
}