import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text, useColorModeValue,
} from '@chakra-ui/react';

export default props => {

  const textColor = useColorModeValue("primary.800", "primary.100")

  return <Flex
    align='center'
    justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
    direction={{ base: 'column-reverse', md: 'row' }}
    wrap='no-wrap'
    minH='70vh'
    px={8}
    mb={16}
  >
    <Stack
      spacing={4}
      w={{ base: '80%', md: '40%' }}
      align={['center', 'center', 'flex-start', 'flex-start']}
    >
      <Heading
        as='h1'
        size='xl'
        fontWeight='bold'
        color={textColor}
        textAlign={['center', 'center', 'left', 'left']}
      >
        Organise your school life
      </Heading>
      <Heading
        as='h2'
        size='md'
        color={textColor}
        opacity='0.8'
        fontWeight='normal'
        lineHeight={1.5}
        textAlign={['center', 'center', 'left', 'left']}
      >
        Timetabl is one place for your homework, timetable, daily notices and more.
      </Heading>
      <Button
        colorScheme='primary'
        borderRadius='8px'
        py='4'
        px='4'
        lineHeight='1'
        size='md'
      >
        Log in with SBHS
      </Button>
      <Text
        fontSize='xs'
        mt={2}
        textAlign='center'
        color={textColor}
        opacity='0.6'
      >
        Free and open source
      </Text>
    </Stack>
    <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
      {props.children}
    </Box>
  </Flex>;
}