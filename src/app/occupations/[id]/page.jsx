'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Text,
  Divider,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  chakra,
  Spinner,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { gql } from "@apollo/client";

const GET_OCCUPATION_DETAILS = gql`
query Occupation($id: String) {
    occupationData(id: $id) {
      onetsocCode
      title
      description
      taskstatementsSet {
        edges {
          node {
            task
            taskType
            taskId
          }
        }
      }
      relatedOccupation{
        edges{
          node{
            onetsocCode{
              title
              onetsocCode
              description
            }
            
          }
        }
      }
    }
  }
`;

const Milestones = ({params}) => {

  const { loading, error, data } = useQuery(GET_OCCUPATION_DETAILS, {
    variables: {id : params.id },
  });

  if (loading) {
    return (
      <Box height={"80vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Spinner
          textAlign={"center"}
          thickness='2px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='md'
        />
      </Box>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const occupation = data.occupationData;

  return (
    <Container maxW="container.lg">
      <Box mt={6}>
        <Text fontSize="2xl" fontWeight="bold">{occupation.title}</Text>
        <Divider my={4} />
        <Text fontSize="lg">{occupation.description}</Text>
      </Box>

      <Divider my={6} />

      

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="right">وظایف این شغل</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack align="start" spacing={4}>
              {occupation.taskstatementsSet.edges.map(({ node }) => (
                <Box key={node.taskId}>
                  <Text fontWeight="bold">{node.task}</Text>
                  <Text fontSize="sm">{node.taskType === 'Core' ? 'اصلی' : 'مکمل'}</Text>
                </Box>
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="right">مشاغل مرتبط</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack align="start" spacing={4}>
              {occupation.relatedOccupation.edges.map(({ node }) => (
                <Box as='a' href={`/occupations/${node.onetsocCode.onetsocCode}`} key={node.onetsocCode.onetsocCode}>
                  <Text fontWeight="bold">{node.onetsocCode.title}</Text>
                  <Text fontSize="sm">{node.onetsocCode.description}</Text>
                </Box>
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default Milestones;
