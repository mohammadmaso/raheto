'use client';


import { Box, Center, Text, Spinner, Stack, Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";

import Result from "../../../components/resultBarChart";
import Interests from "../../../components/interests";

import { gql } from "@apollo/client";
import Link from "next/link";

const AllTestResultsQuery = gql`
  query AllTestResults {
    me {
      surveyresultSet {
        edges {
          node {
            id
            RScore
            IScore
            AScore
            EScore
            SScore
            CScore
            jobeZone
          }
        }
      }
    }
  }
`;



const TestResultsPage = () => {
  const { loading, error, data } = useQuery(AllTestResultsQuery);

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

const surveyResults = data?.me?.surveyresultSet?.edges[0] || [];

    // Get the largest score value
  // Define an array of score objects with corresponding names
  const scores = [
    { name: 'RScore', value: surveyResults.node.RScore },
    { name: 'IScore', value: surveyResults.node.IScore },
    { name: 'AScore', value: surveyResults.node.AScore },
    { name: 'EScore', value: surveyResults.node.EScore },
    { name: 'SScore', value: surveyResults.node.SScore },
    { name: 'CScore', value: surveyResults.node.CScore },
  ];

  // Find the largest score
  const largestScore = Math.max(...scores.map(score => score.value));

  // Find the name corresponding to the largest score
  const largestScoreName = scores.find(score => score.value === largestScore)?.name;


  return (
    <Stack justifyContent="center" alignItems="center" minH={"80vh"}>
      <Box  p="10" mb="6" borderWidth="1px" borderRadius="md">
        <Result surveyResults={surveyResults} />

        <Box p="10" mt="6" borderWidth="1px" borderRadius="md">
            <Interests largestScoreName={largestScoreName}/>
        </Box>
        <Link href={"/profiler/result/occupations"} passHref>
        <Button mt="3" width={"100%"} color={"telegram.500"} >مشاهده و بررسی مشاغل پیشنهادی</Button>
        </Link>
      </Box>

      
    </Stack>
  );
};

export default TestResultsPage;