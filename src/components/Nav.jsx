import { Flex, IconButton, Text, useColorMode, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaGithub, FaMoon, FaSun } from 'react-icons/all';
import React from 'react';

export default () => {
  const { toggleColorMode } = useColorMode()
  const textColor = useColorModeValue("primary.700", "primary.200")
  const iconColor = useColorModeValue("black", "white")
  const icon = useColorModeValue(<FaMoon />, <FaSun />)

  return <Flex
    as='nav'
    align='center'
    justify='space-between'
    wrap='wrap'
    w='100%'
    h='70%'
    mb={8}
    p={8}
    bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
    color={['white', 'white', textColor, textColor]}
  >
    <Text fontWeight='medium'>Timetabl</Text>
    <Flex>
      <IconButton onClick={toggleColorMode} aria-label='Dark mode' color={iconColor} icon={icon} mr={1} />
      <a href='https://github.com/debater-coder/timetabl'>
        <IconButton color={iconColor} icon={<FaGithub />} aria-label='Github Repository' />
      </a>
    </Flex>
  </Flex>;
}