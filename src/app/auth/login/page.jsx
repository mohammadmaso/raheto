'use client'

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Text,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

// Your GraphQL mutation
// import { TOKEN_AUTH_MUTATION } from 'path/to/your/mutations'; // Update the path


const TOKEN_AUTH_MUTATION = gql`
mutation TokenAuth(
    $tokenAuthPassword: String!
    $tokenAuthPhoneNumber: String
    $tokenAuthEmail: String
    $tokenAuthUsername: String
  ) {
    tokenAuth(
      password: $tokenAuthPassword
      phoneNumber: $tokenAuthPhoneNumber
      email: $tokenAuthEmail
      username: $tokenAuthUsername
    ) {
      token
      success
  
      refreshToken
    }
  }
`

const SimpleSignIn = () => {
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const [tokenAuth, { loading }] = useMutation(TOKEN_AUTH_MUTATION);

  const handleClick = () => setShow(!show);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await tokenAuth({
        variables: {
          tokenAuthPassword: password,
          tokenAuthPhoneNumber: phoneNumber,
        },
      });

      // Handle success
      const { token, success, refreshToken } = data.tokenAuth;
      if (success) {


        localStorage.setItem('jwtToken', token);
        localStorage.setItem('refreshToken', refreshToken);



        // Redirect to the main page
        router.push('/'); // Update with your desired path
        setTimeout(() => {
            location.reload();
          }, 2000);        

        // You can save the token and refreshToken to the state or localStorage
        console.log('Login successful!');
        toast({
          title: 'ورود با موفقیت انجام شد.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Login failed');
        toast({
          title: 'ورود ناموفق',
          description: 'اطلاعات ورود نادرست است.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <Container display={"flex"} justifyContent={"center"} alignItems={"center"} maxW="7xl" height={"80vh"} p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">ورود به حساب کاربری</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="xl"
            boxShadow="xl"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="number">
                <FormLabel>شماره همراه</FormLabel>
                <Input rounded="md" type="number" onChange={(e) => setPhoneNumber(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>رمزعبور</FormLabel>
                <InputGroup size="md">
                  <Input rounded="md" type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                  <InputLeftElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'مخفی' : 'نمایان'}
                    </Button>
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%" justify={"center"} align={"center"}>
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Link href='/auth/forgot' fontSize={{ base: 'md', sm: 'md' }}>فراموشی رمزعبور</Link>
              </Stack>
              <Button
                bg="telegram.500"
                color="white"
                onClick={handleLogin}
                isLoading={loading}
                loadingText="در حال ورود..."
                _hover={{
                  bg: 'telegram.300'
                }}
                rounded="md"
                w="100%"
              >
                ورود
              </Button>
              <Link href='/auth/register' fontSize={{ base: 'md', sm: 'md' }}>ثبت‌نام</Link>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SimpleSignIn;