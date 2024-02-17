"use client";

import { Box, SimpleGrid, Image, Text, Flex, Spinner, Badge, Heading, Tooltip, Divider, VStack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { seo } from "../../../config";
import Link from 'next/link';
import ContactCard from "@/components/contactCard";
import { Icon } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import Category from "@/components/categories";
import { useEffect, useState } from 'react';

const GET_ALL_OCCUPATIONS = gql`
  query AllOccupations {
    allOccupationData {
      edges {
        node {
          title
          onetsocCode
          description
        }
      }
    }
  }
`;

const BlogPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_OCCUPATIONS);

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

  if (error) {
    return <p>خطا: {error.message}</p>;
  }

  const occupations = data.allOccupationData.edges;

  // Get the Persian alphabet order
  const persianAlphabetOrder = [...Array(32)].map((_, i) => String.fromCharCode(1575 + i));

  // Group occupations by the first Persian alphabet character
  const groupedOccupations = {};

  occupations.forEach(({ node }) => {
    const firstChar = node.title.charAt(0);
    const charCode = firstChar.charCodeAt(0);

    if (charCode >= 1575 && charCode <= 1606) {
      const alphabetIndex = charCode - 1575;
      const alphabetChar = persianAlphabetOrder[alphabetIndex];

      if (!groupedOccupations[alphabetChar]) {
        groupedOccupations[alphabetChar] = [];
      }

      groupedOccupations[alphabetChar].push(node);
    }
  });

   

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />

      
      {Object.entries(groupedOccupations).map(([alphabetChar, jobs]) => (
        <Box key={alphabetChar} mt={4}>
          <Heading fontWeight="bold" fontSize="4xl" mb={2} color="blue.700">
            {alphabetChar}
          </Heading>
          <Divider m="4"/>
          <SimpleGrid columns={3} spacing={1}>
            {jobs.map((job) => (
              <Link href={`/occupations/${job.onetsocCode}`} passHref key={job.onetsocCode}>
                <VStack justify={"right"} align={"right"} textAlign={"right"} as="a"   borderRadius="md"  >
                  <Tooltip label={job.description}>
                    <Text fontWeight="bold" fontSize="lg" >
                      {job.title}
                    </Text>
                  </Tooltip>
                  <Text  fontSize="md"color={"gray.300"}>
                      {job.onetsocCode}
                    </Text>
                </VStack>
                <Divider m={1}/>

              </Link>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </>
  );
};

export default BlogPage;