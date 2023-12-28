'use client'

import { Box, Button, Icon, Link as ChakraLink, Text, HStack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram, FaCode, FaHeart } from "react-icons/fa";

import { MAX_WIDTH } from "../../config";
import Link from "next/link";

// Fell free to add your social media accounts!
let versionNumber = "۰.۰.۱"

const Footer = () => {
  return (
    <Box as="footer">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        textAlign="center"
        minH="4rem"
        px={[4, 6, 10, 14, 20]}
        maxW={MAX_WIDTH}
        mx="auto"
      >
        
        <Box pt="3">
          <HStack>
            <Text>ساخته شده با{" "}</Text>
            
            <FaHeart/>
            <Text>برای{" "}یادگیری پرثمر</Text>
              
           
          </HStack>
        </Box>
        <Link href={"https://github.com/mohammadmaso/raheto"} passHref>
        <Text>نسخه {versionNumber}</Text></Link>
       
      </Box>
    </Box>
  );
};

export default Footer;
