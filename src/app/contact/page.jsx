'use client'
import React from 'react';
import { Box, Text, Flex, Button, Divider, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Divide } from 'hamburger-react';
import { AtSignIcon } from '@chakra-ui/icons';

const CenteredBoxWithText = () => {
  return (
    <Stack
    
    height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
>      
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      maxW={"md"}
      minW={"md"}
      textAlign="center"
      rounded={"lg"}
      m={5}
      p={5}
    >
      <Text textAlign="center">
            ساخته شده توسط 
            <Link href={"https://github.com/mohammadmaso"} passHref>
                <Button m={2} size={"xs"} leftIcon={<FaGithub/> }>
                محمد مسعودی
          </Button></Link>
          
      </Text>
      <Divider/>
      <Text textAlign="center">
            جهت ارائه پیشنهادات، ارائه نقشه راه با نام خود و همچنین اصلاحات و یا دیگر نقطه‌نظرات با ایمیل 
            <Link href={"mailto:hi@raheto.com"} passHref>
                <Button m={2} size={"xs"} >
                hi@raheto.com
          </Button></Link>
          در ارتباط باشید.
      </Text>
      
    </Stack></Stack>
  );
};

export default CenteredBoxWithText;
