'use client'
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import NextImage from "next/image";

import { seo, data } from "../../config";

 
const metadata = {
  title: 'راه تو |‌ یادگیری با نقشه‌راه',
}


const Home = () => {
  const color = useColorModeValue("telegram.500", "telegram.400");
  const isOdd = (num) => num % 2;

  const title = "Home";
  const description = seo.description;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={seo.canonical}
        openGraph={{
          title,
          description,
          images: [
            {
              url: `https://img.freepik.com/free-photo/location-symbols-road-with-mountains_23-2149764141.jpg?t=st=1703392715~exp=1703393315~hmac=d7ca239d94e454a96e1c81adf290592cb680d1e602751e61cefa1e16cf49a804`,
              width: "350px",
              height: "350px",
              alt: "avatar bigheads",
            },
          ],
        }}
      />
     

      <Box
        as="section"
        d="flex"
        alignItems="center"
        flexDir="column"
        textAlign="center"
        justifyContent={"center"}
        py="4"
        minH={"80vh"}
        className="centered-image-container"
      >
        <Image
          src="/location-symbols-road-with-mountains_23-2149764141.jpg"
        mb={3}
          alt="avatar bigheads"
          placeholder="blur"
          blurDataURL="L5I~of#i004mgjw]-4XA00?wL#xu"
          priority
          className="rounded-image"
        />
        <Box>
          
          <Heading fontSize={["3xl", "4xl"]} fontWeight="700">
            <Text as="span" color={color}>
              یادگیری به روش
            </Text>{" "}
            نقشه‌راه‌های تعاملی
          </Heading>
          <Text py="4">
            روش نوین یادگیری، منابع متعدد و قابل اعتماد، نظم ذهنی در هنگام یادگیری
          </Text>
          
        </Box>
      </Box>

      
    </>
  );
};

export default Home;
