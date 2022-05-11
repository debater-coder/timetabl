import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { useDataManager } from '../../../hooks/useDataManager';

export default () => {
  const { name, studentID, email, role, department } = useDataManager();

  return <Flex direction={{ base: 'column', md: 'row' }} width={'100%'} height={'100%'}>
    <Flex
      width={{ base: '100%', md: '30%' }}
      height={{ base: '30%', md: '100%' }}
      direction={"column"}
      align={"center"}
    >
      <Avatar
        name={name}
        bg={'primary.100'}
        size={'2xl'}
        mb={2}
      />
      <Text
        textAlign={"center"}
      >
        {name}
      </Text>
    </Flex>
    <Flex
      width={'100%'}
      height={'100%'}
    >
      <TableContainer ml={"auto"} mr={"auto"}>
        <Table variant='simple'>
          <Tbody>
            <Tr>
              <Td>Student ID</Td>
              <Td>{studentID}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{email}</Td>
            </Tr>
            <Tr>
              <Td>Role</Td>
              <Td>{role}</Td>
            </Tr>
            <Tr>
              <Td>Department</Td>
              <Td>{department}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  </Flex>;
}