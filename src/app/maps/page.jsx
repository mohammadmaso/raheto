"use client";
import { Box, SimpleGrid, Image, Text, Flex, Spinner } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { seo } from "../../../config";
import Link from 'next/link';
import ContactCard from "@/components/contactCard"

 


const GET_ALL_MAPS = gql`
  query AllMaps(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $title: String
    $title_Icontains: String
    $title_Istartswith: String
  ) {
    allMaps(
      offset: $offset
      before: $before
      after: $after
      first: $first
      last: $last
      title: $title
      title_Icontains: $title_Icontains
      title_Istartswith: $title_Istartswith
    ) {
      edges {
        node {
          id
          title
          picture
          slug
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const BlogPage = () => {
  const title = "Blog";
  const description = seo.description;
  const url = `${seo.canonical}blog`;

  const { loading, error, data } = useQuery(GET_ALL_MAPS, {
    variables: {
      first: 10,
    },
  });

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

  const maps = data.allMaps.edges;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
        }}
      />
      <Box
        as="section"
        fontSize="16px"
        px={{ md: "10", lg: "20", xl: "30" }}
        py="4"
        minH={"80vh"}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
          {maps.map((map) => (
              <Link key={map.node.id} href={`/maps/${map.node.slug}`} passHref>
            <Box key={map.node.id}  borderRadius="lg" boxShadow="md" p={4} cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}>
              <Image
                src={`https://raheto.panel.0be1.ir/media/${map.node.picture}`}
                alt={map.node.title}
                borderRadius="md"
                mb={4}
                height="200px" // Set your desired fixed height here
                objectFit="cover"
                width="100%"
              />
              <Text fontSize="xl"  mb={2}>{map.node.title}</Text>
              {/* You can add more information or customize the card as needed */}
            </Box>
            </Link>
          ))}

          <ContactCard/>


        </SimpleGrid>
      </Box>
      
    </>
  );
};

export default BlogPage;
