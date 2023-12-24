// 'use client'
import { useState } from "react";
import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";

import HamburgerMenu from "../UI/hamburgerMenu";
import ColorModeToggle from "../UI/colorModeToggle";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useColorModeValue("gray.200", "gray.300");
  const color = useColorModeValue("black", "white");

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
      <Box
        as="nav"
        display="flex"
        flexDir={{ base: "row-reverse", lg: "row" }}
        alignItems="center"
        fontWeight="500"
        
      >
        <HamburgerMenu toggled={isOpen} toggle={setIsOpen} />
        <Box
          bg={{ base: bg, lg: "transparent" }}
          color={{ base: "black", lg: color }}
          display={{
            base: isOpen ? "block" : "none",
            lg: "flex",
          }}
          position={{ base: "absolute", lg: "static" }}
          top="5rem"
          left="5%"
          right="5%"
          rounded={{ base: "lg", lg: "none" }}
          py={{ base: "2", lg: "0" }}
          px={{ base: "4", lg: "0" }}
          alignItems={{ lg: "center" }}
          boxShadow={{ base: "xl", lg: "none" }}
          zIndex="2"
        >
          <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/" onClick={closeMenu}>
              خانه
            </Link>
          </Box>

          <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/maps" onClick={closeMenu}>
              نقشه‌راه‌ها
            </Link>
          </Box>

          <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/contact" onClick={closeMenu}>
              همکاری
            </Link>
          </Box>
        </Box>

        <ColorModeToggle />
      </Box>
  );
};

export default Navbar;
