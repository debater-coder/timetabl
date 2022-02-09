import React from 'react';
import { Box, Button, Flex, Heading, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default props => {
  const textColor = useColorModeValue('primary.800', 'primary.100');
  const secondaryTextColor = useColorModeValue('secondary.500', 'secondary.100');

  return <Flex
    align='center'
    justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
    direction={{ base: 'column', md: 'row' }}
    wrap='no-wrap'
    minH='70vh'
    px={8}
    mb={16}
  >
    <Stack
      spacing={4}
      mb={5}
      w={{ base: '80%', md: '40%' }}
      align={['center', 'center', 'flex-start', 'flex-start']}
    >
      <Heading
        as='h1'
        size='xl'
        fontWeight='bold'
        color={textColor}
        textAlign={['center', 'center', 'left', 'left']}
        bgGradient={`linear(to-r, ${textColor}, ${secondaryTextColor})`}
        bgClip='text'
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
        onClick={props.onCTAClick}
      >
        Log in with SBHS
      </Button>
      <Link
        fontSize='xs'
        mt={2}
        textAlign='center'
        color={textColor}
        opacity='0.6'
        href={"https://github.com/debater-coder/timetabl"}
      >
        Free and open source
      </Link>
    </Stack>
    <Box>
      {props.children}
    </Box>
  </Flex>;
}