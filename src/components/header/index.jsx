'use client'
import { Box } from "@chakra-ui/react";

import { MAX_WIDTH } from "../../../config";
import Logo from "../UI/logo";
import Navbar from "./navbar";

const Header = () => {
  return (
      <Box display="flex" boxShadow="md" px={[4, 6, 10, 14, 20]} maxW={MAX_WIDTH} mx="auto" justifyContent="space-between" alignItems="center" h="4rem">
        <Logo />
        <Navbar />
      </Box>
  );
};

export default Header;
