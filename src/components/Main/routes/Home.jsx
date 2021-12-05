import React, { useEffect, useState } from 'react';
import { Box, chakra, Flex, Heading, Icon, Text, Tooltip } from '@chakra-ui/react';
import Period from '../Period';
import { useBarcode } from 'react-barcodes';
import { Barcode as PhosphorBarcode, CaretDown as PhosphorCaretDown } from 'phosphor-react';
import { useInView } from 'react-intersection-observer';
import DailyTimetable from '../DailyTimetable';

const Barcode = chakra(PhosphorBarcode)
const CaretDown = chakra(PhosphorCaretDown)

export default () => {
  const { inputRef: barcodeRef } = useBarcode({
    value: '444315458',
    options: {
      displayValue: false,
      background: '#ffffff',
    }
  });

  const { ref: scrollRef, inView } = useInView({threshold: 0.5})

  return <Flex direction={'column'} align={'center'}>
    {/*<Flex direction={'row'} align={'baseline'}><Text fontSize={'xl'}>Roll call </Text><Text ml={1}>in</Text></Flex>*/}
    {/*<Heading as={'h1'} size={'3xl'} mb={7}>00:05:00</Heading>*/}
    {/*<Period subject={'Geography'} time={'9:30'} room={507} teacher={'M Jas'} roomChanged teacherChanged/>*/}
    {/*<Period subject={'Music'} isCurrent time={'10:30'} room={214} teacher={'S Lim'} timeChanged />*/}
    {/*<Period subject={'Recess'} isBreak time={'11:25'} />*/}
    {/*<Period subject={'Visual Arts'} time={'11:45'} room={707} teacher={'E Apostolides'} />*/}
    {/*<Period isBreak subject={'Lunch'} time={'12:40'} />*/}
    {/*<Period subject={'English'} room={'701'} time={'1:30'} teacher={'D Taylor'} teacherChanged roomChanged />*/}
    {/*<Period subject={'Design Technology'} room={501} time={'2:40'} teacher={'L Chapple'} teacherChanged />*/}
    <DailyTimetable nextPeriod={"Roll call"} timeUntilNextPeriod={"00:05:00"} periods={[
      {
        subject: "Geography",
        time: "9:30",
        room: 507,
        teacher: "M Jas",
        roomChanged: true,
        teacherChanged: true
      },
      {
        subject: "Music",
        time: "10:30",
        room: 214,
        teacher: "Ms Lim",
        timeChanged: true,
        isCurrent: true
      },
      {
        subject: "Recess",
        isBreak: true,
        time: "11:15"
      },
      {
        subject: "Visual Arts",
        time: "11:45",
        room: 707,
        teacher: "E Apostiledes"
      },
      {
        subject: "Lunch",
        isBreak: true,
        time: "12:40"
      },
      {
        subject: "English",
        time: "12:30",
        room: 701,
        teacher: "D Taylor",
        teacherChanged: true,
        roomChanged: true
      },
      {
        subject: "Design Technology",
        time: "2:40",
        room: 501,
        teacher: "L Chapple",
        teacherChanged: true
      }

    ]}/>
    <Tooltip label={"You can use this barcode to scan in"} closeOnClick={false}>
      <Icon boxSize={7} mb={3} mt={5}/>
    </Tooltip>
    <Box borderRadius={5} p={2} bg={"white"} ref={scrollRef}><canvas ref={barcodeRef} /></Box>
    { inView ? <></> : <Flex
      direction={'column'}
      bg={'white'}
      h={'60px'}
      w={'60px'}
      align={'center'}
      justify={'center'}
      borderRadius={'30px'}
      position={'fixed'}
      bottom={'100px'}
      right={'5vw'}
      boxShadow={"xl"}
      onClick={() => barcodeRef.current.scrollIntoView({ behavior: 'smooth' })}
    >
      <Barcode size={30} mb={'-7px'} color={'black'} />
      <CaretDown size={30} color={'black'} />
    </Flex>}
  </Flex>;
};
