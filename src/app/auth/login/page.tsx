// components/Login.tsx
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React from 'react';

const Page: React.FC = () => {
  return (
    <VStack spacing={4} align="stretch" width="300px" mx="auto" mt={8}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Log in
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Page;
