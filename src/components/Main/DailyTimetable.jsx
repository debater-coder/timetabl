import { Flex, Heading, Text } from '@chakra-ui/react';
import Period from './Period';
import React from 'react';

export default ({ nextPeriod, timeUntilNextPeriod, periods, headingSize = '3xl' }) => <>
  <Flex direction={'row'} align={'baseline'}><Text fontSize={'xl'}>{nextPeriod} </Text><Text ml={1}>in</Text></Flex>
  <Heading as={'h1'} size={headingSize} mb={7}>{timeUntilNextPeriod}</Heading>
  {periods.map((period, index) => <Period {...period} key={index} />)}
</>