import Nav from './Nav';
import Hero from './Hero';
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'urql';

const query = `
  query {
    bells(date: "2021-08-30") {
        bells {
            bell
            time
        }
    }
  }
`

export default ({onCTAClick}) => {

  const timetableColor = useColorModeValue("gray.100", "gray.700")

  const [result, reexecuteQuery] = useQuery({
    query,
  })

  const { data, fetching, error } = result;
  if (error) console.error(error)

  return <Flex direction='column' align='center' maxW={{ xl: '1200px' }} m='0 auto'>
    <Nav />
    <Hero onCTAClick={onCTAClick}>
      <Flex
        bgColor={timetableColor}
        height={400}
        rounded={20}
        align="center"
        justifyContent="center"
        direction="column"
      >
        {
          fetching ? "Loading..." : data.bells.bells.map(bell => <Text key={bell.bell + bell.time}  fontSize="lg">{bell.bell}: {bell.time} </Text> )
        }
      </Flex>
    </Hero>
  </Flex>;
}