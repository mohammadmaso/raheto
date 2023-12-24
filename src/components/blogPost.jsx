'use client'

import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import dayjs from "dayjs";

import { tagColor } from "./UI/tagColor";
import TagComponent from "./UI/tag";

const BlogPost = ({ posts }) => {
  const router = useRouter();

  const summaryColor = useColorModeValue("gray.600", "gray.300");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const yearColor = useColorModeValue("telegram.500", "telegram.400");


  return (
    <>
      {posts.map((post) => {

        const { picture, title } = post.node;


        


        return (
          <Box my="3" py="2" px="4" rounded="md" key={title}>

            <Heading as="h3" fontSize="2xl" fontWeight="700">
              <NextLink href={`/maps/${title}`}>
                {title}
              </NextLink>
            </Heading>

            

            

            
          </Box>
        );
      })}
    </>
  );
};

export default BlogPost;
