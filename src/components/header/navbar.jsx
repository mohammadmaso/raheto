'use client'
import { useState } from "react";
import { Box, Button, ChakraProvider, useColorModeValue, Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem} from "@chakra-ui/react";

import HamburgerMenu from "../UI/hamburgerMenu";
import ColorModeToggle from "../UI/colorModeToggle";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";
import useAuth from "../../hooks/useAuth"
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useColorModeValue("gray.200", "gray.300");
  const color = useColorModeValue("black", "white");

  const { isLoggedIn, user } = useAuth();

  const router = useRouter()


  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwtToken');

    // Refresh the page
    location.reload();
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
          {/* <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/" onClick={closeMenu}>
              خانه
            </Link>
          </Box> */}

          <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/occupations" onClick={closeMenu}>
              بانک مشاغل
            </Link>
          </Box>

          <Box
            listStyleType="none"
            px={{ lg: "8" }}
            py={{ base: "3", lg: "0" }}
          >
            <Link href="/profiler" onClick={closeMenu}>
              تست مسیرشغلی
            </Link>
          </Box>

          <Box
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
      >
        {/* Conditionally render the avatar or login/register button */}
        {isLoggedIn ? (
          // If user is logged in, display the avatar or placeholder
          <Menu>
              <MenuButton color={"transparent"} rightIcon={<ChevronDownIcon />} >
                <Avatar
                  name={user?.username || 'نام'}
                  src={user?.avatar || '/placeholder-user.jpg'}
                  size="sm"
                  shadow="md"
                />
              </MenuButton>
              <MenuList>
                <Link href="/profiler/result">
                <MenuItem>آخرین نتیجه تست</MenuItem></Link>
                <MenuItem onClick={handleLogout}>خروج</MenuItem>
              </MenuList>
            </Menu>
        ) : (
          // If user is not logged in, display the login/register button
          <Link href="/auth/login" onClick={closeMenu}>
            <Button width={"max-content"} colorScheme="telegram" leftIcon={<LuLogIn />}>
              ورود/ ثبت‌نام
            </Button>
          </Link>
        )}
      </Box>
        </Box>

        <ColorModeToggle />
      </Box>
  );
};

export default Navbar;
