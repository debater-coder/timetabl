import React from 'react';
import { Box, chakra, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { useBarcode } from 'react-barcodes';
import { Barcode as PhosphorBarcode, CaretDown as PhosphorCaretDown } from 'phosphor-react';
import { useInView } from 'react-intersection-observer';
import DailyTimetable from '../DailyTimetable';
import { useDataManager } from '../../../hooks/useDataManager';

const Barcode = chakra(PhosphorBarcode);
const CaretDown = chakra(PhosphorCaretDown);

export default () => {
  const { periods, studentID } = useDataManager()

  const { inputRef: barcodeRef } = useBarcode({
    value: studentID.toString(),
    options: {
      displayValue: false,
      background: '#ffffff',
    },
  });

  const { ref: scrollRef, inView } = useInView({ threshold: 0.5 });

  return <Flex direction={'column'} align={'center'}>
    <DailyTimetable nextPeriod={'Roll call'} timeUntilNextPeriod={'00:05:00'} periods={periods} />
    <Tooltip label={'You can use this barcode to scan in'} closeOnClick={false}>
      <Icon boxSize={7} mb={3} mt={5} />
    </Tooltip>
    <Box borderRadius={5} p={2} bg={'white'} ref={scrollRef}>
      <canvas ref={barcodeRef} />
    </Box>
    {inView ? <></> : <Flex
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
      boxShadow={'xl'}
      onClick={() => barcodeRef.current.scrollIntoView({ behavior: 'smooth' })}
    >
      <Barcode size={30} mb={'-7px'} color={'black'} />
      <CaretDown size={30} color={'black'} />
    </Flex>}
  </Flex>;
};
