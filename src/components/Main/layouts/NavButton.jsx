import { Box, Flex, Grid, Text, useColorModeValue, useToken } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from 'phosphor-react';
import { motion } from 'framer-motion';

export default ({name, icon: Icon, active}) => {
  const hoverColor = useColorModeValue("gray.100", "gray.700")
  const [secondary] = useToken("colors", ["secondary.100"])
  const MotionFlex = motion(Flex)
  return <Flex _hover={{bg: hoverColor}} pt="12px" pb="16px" direction={'column'} w='84px' align={'center'}>

    <MotionFlex
      gridRowStart={"1"}
      gridColumnStart={"1"}
      justify={'center'}
      bg={active ? secondary + "40" : undefined}
      animate={
        {width: active ? "64px" : "0px"}
      }
      align={'center'}
      borderRadius={'16px'} h={'32px'}
    >
      <Box minH={"24px"}><Icon gridRowStart={"1"} gridColumnStart={"1"} size="24px" weight={active ? 'fill' : 'duotone'} /></Box>
    </MotionFlex>
    <Text as={active ? "b" : 'label'} fontSize={'sm'} mt='4px'>{name}</Text>
  </Flex>;
}