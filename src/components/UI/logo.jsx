'use client'

import { HStack, Image, chakra } from "@chakra-ui/react";
import NextLink from "next/link";

const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <HStack justify={"center"}  align={"center"}>
        <Image src="/logo.svg" height={"2rem"}/>
      <chakra.a fontSize="2rem" fontWeight="700">
        راهِ‌تو
      </chakra.a>
      </HStack>
    </NextLink>
  );
};

export default Logo;
