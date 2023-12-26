'use client'
import React,{ useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaBook, FaCheck } from 'react-icons/fa'; // You can import icons from another library

import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  UnorderedList,
  ListItem,
  Circle,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { LuPrinter } from "react-icons/lu";
import TrackLearning from "@/components/trackLearning"

const GET_MAP = gql`query GetMapDetails($mapSlug: String!) {
  map(slug: $mapSlug) {
    id
    title
    picture
    nodes(first: 100) {
      edges {
        node {
          id
          title
          order
          slug
          lessons(first: 100) {
            edges {
              node {
                id
                title
                enTitle
                order
                slug
                markdownContent {
                  content
                }
              }
            }
          }
        }
      }
    }
  }
}

`


const Milestones = ({ params }) => {



  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const { loading, error, data } = useQuery(GET_MAP, {
    variables:{
      mapSlug: params.slug
    }
  });
  const componentRef = useRef();
      const handlePrint = useReactToPrint({
       content: () => componentRef.current,
       documentTitle: "نقشه راه راه‌تو",
       onAfterPrint: () => console.log('Printed PDF successfully!'),
      })

  


  if (loading) return (
    <Box  height={"80vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
    <Spinner
    textAlign={"center"}
    thickness='2px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='md'
  /></Box>);
    if (error) return <p>خطا: {error.message}</p>;
  
      

  return (
    <Container ref={componentRef} maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
        {data.map.title}
      </chakra.h3>
      <Button size={"xs"} textAlign={"center"} leftIcon={<LuPrinter />} onClick={handlePrint}>دانلود نسخه چاپی</Button>
      <TrackLearning/>

      <Divider m={3}/>
      {data.map.nodes.edges.map((node) => (
        <Flex key={node.node.id} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && node.node.order % 2 === 0 && (
            <>
              <EmptyCard />
              <LineWithDot />
              <Card {...node.node} />
            </>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <Card {...node.node} />
              <LineWithDot />

            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && node.node.order % 2 !== 0 && (
            <>
              <Card {...node.node} />

              <LineWithDot />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Container>
  );
};



const Card = (data) => {
  let lessons = data.lessons.edges
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = data.order % 2 == 0;
  let borderWidthValue = isEvenId ? '15px 0 15px 15px' : '15px 15px 15px 0';
  let rightValue = isEvenId ? '-15px' : 'unset';
  let  leftValue = isEvenId ? 'unset' : '-15px';

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = '-15px';
    rightValue = 'unset';
    borderWidthValue = '15px 15px 15px 0';
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLesson, setSelectedLesson] = React.useState(null);

  const openDrawer = (lesson) => {
    setSelectedLesson(lesson);
    onOpen();
  };



  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue('yellow.100', 'yellow.700')}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: `transparent ${useColorModeValue('#FEFCBF', '#975A16')} transparent`,
        borderStyle: 'solid',
        borderWidth: borderWidthValue,
        position: 'absolute',
        left: leftValue,
        right: rightValue,
        display: 'block'
      }}
    >
      <Box>
        <VStack spacing={2} mb={3} textAlign="right">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {data.title}
          </chakra.h1>
          
          <Lessons lessons={lessons} onOpenDrawer={openDrawer}/>
          {/* Drawer component */}
      {selectedLesson && (
        <Drawer1
          onClose={() => {
            setSelectedLesson(null);
            onClose();
          }}
          isOpen={isOpen}
          content={selectedLesson.markdownContent.content}
          title={selectedLesson.title}
        />
      )}
         
        </VStack>
      </Box>
    </HStack>
  );
};

const Lessons = ({lessons,onOpenDrawer}) => {
  const { activeStep } = useSteps({
    index: 0,
    count: lessons.length,
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'green.500';
      case 'active':
        return 'blue.500';
      default:
        return 'yellow.500';
    }
  };


  return (
    <>
               <UnorderedList listStyleType="none" ml={0} spacing={4}>
      {lessons.map((lesson, index) => (
        <ListItem
          key={lesson.node.id}
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={() => onOpenDrawer(lesson.node)}
        >
          <Circle
            size="5"
            bg={getStatusColor(lesson.node.status)}
            color="white"
            marginRight="4"
          >
            {/* You can put any icon or text inside the Circle component */}
            {lesson.node.status === 'complete' ? '✓' : lesson.node.status === 'active' ? '→' : ''}
          </Circle>
          <Box mr={2}>
            <Text fontSize="md" fontWeight="bold">
              {lesson.node.title}
            </Text>
            <Text>{lesson.node.enTitle}</Text>
          </Box>
        </ListItem>
      ))}
    </UnorderedList>

</>
  )
}

const Drawer1 = ({onClose,isOpen, content, id}) =>{

  return (
    
  <Drawer id={id}  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader w="100%" display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
        <DrawerCloseButton />

            <Menu>
              <MenuButton p={2} as={IconButton} size="sm"  variant="outline" colorScheme="teal">
                {/* Circular color indicator */}
                وضعیت مطالعه 
              </MenuButton>
              <MenuList fontSize={"small"}>
                <MenuItem size="2xs" >
                  {/* Circular color indicator */}
                  <Avatar size="2xs" name=' ' bg="red.500" marginRight={2} />
                  <Text p="1">خوانده نشده</Text>
                </MenuItem>
                <MenuItem size="2xs">
                  {/* Circular color indicator */}
                  <Avatar size='2xs' name=' ' bg="yellow.500" marginRight={2} />
                  <Text p="1" size="2xs">در حال خواندن</Text>
                </MenuItem>
                <MenuItem size="2xs">
                  {/* Circular color indicator */}
                  <Avatar size="2xs" name=' ' bg="green.500" marginRight={2} />
                  <Text p="1" size="2xs">خوانده شده</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </DrawerHeader>
          <DrawerBody>
          <ReactMarkdown components={ChakraUIRenderer()}  skipHtml >{content}</ReactMarkdown>;

            </DrawerBody>
        </DrawerContent>
      </Drawer>)
}

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: '40px', md: '40px' }}
      ml={{ base: '0', md: '40px' }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="20px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue('yellow.400', 'yellow.100')}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent"></Box>;
};

export default Milestones;