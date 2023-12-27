import { Box, Flex, Text, useColorModeValue,chakra, Heading } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

const DashedLineWithText = () => {
  const lineColor = 'yellow.500';

  return (
    <Flex
      pos="relative"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      mx={{ base: '40px', md: '40px' }}
    >
        
      <Box
        pos="absolute"
        left="50%"
        width="2px"
        height="calc(100% + 20px)"
        bgGradient={`linear(to-b, gray.200, #FF008000)`}
        
      />
     
      <Text bgGradient='linear(to-l, yellow.400, yellow.700)'
  bgClip='text' fontSize={"lg"} fontWeight={"black"} mt="20" >
        یادگیری هرگز متوقف نمی‌شود، با اشتیاق به یادگیری ادامه دهید.‌..
      </Text>
    </Flex>
  );
};

export default DashedLineWithText;
