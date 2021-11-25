import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Period from '../Period';

export default () => <Flex direction={"column"} align={"center"}>
  <Flex direction={"row"} align={"baseline"}><Text fontSize={"xl"}>Roll call </Text><Text ml={1}>in</Text></Flex>
  <Heading as={"h1"} size={"3xl"} mb={7}>00:05:00</Heading>
  <Period />
  <Period />
  <Period />
  <Period />
  <Period />
  <Period />
  <Period />

</Flex>;
