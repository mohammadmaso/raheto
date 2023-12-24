'use client'

import { Box, Button, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from "react-icons/fa";

import { MAX_WIDTH } from "../../config";

// Fell free to add your social media accounts!


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
        
        <Box py="4">
          <Text>
            ساخته شده با{" "}
            <span role="img" aria-label="red heart">
              ❤️
            </span>
            
              برای
            {" "}
            
            یادگیری پرثمر
           
          </Text>
        </Box>
       
      </Box>
    </Box>
  );
};

export default Footer;
