'use client'
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
  Link,
  InputLeftElement,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';


const REGISTER_SMS_MUTATION = gql`
  mutation RegisterSms(
    $registerSmsPassword1: String!
    $registerSmsPassword2: String!
    $registerSmsPhoneNumber: String!
    $registerSmsUsername: String
  ) {
    registerSms(
      password1: $registerSmsPassword1
      password2: $registerSmsPassword2
      phoneNumber: $registerSmsPhoneNumber
      username: $registerSmsUsername
    ) {
      success
    }
  }
`;


const SimpleSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const [registerSms, { loading }] = useMutation(REGISTER_SMS_MUTATION);
  const router = useRouter();
  const toast = useToast();

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        toast({
          title: 'حطا در ساخت حساب',
          description: 'تکرار رمزعبرو و رمز عبور یکی نیست!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const { data } = await registerSms({
        variables: {
          registerSmsPassword1: password,
          registerSmsPassword2: confirmPassword,
          registerSmsPhoneNumber: phoneNumber,
          registerSmsUsername: username,
        },
      });

      const success = data?.registerSms?.success;

      if (success) {
        // Registration successful, redirect to /auth/verify
        console.log('Registration successful!');
        toast({
          title: 'حساب با موفقیت ساخته شد',
          description: 'لطفا حساب خود را فعال نمایید.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push(`/auth/verify?phoneNumber=${phoneNumber}`);
      } else {
        console.error('Registration failed');
        toast({
          title: 'خطا در ثبت‌نام',
          description: 'خطایی رخ داده است، لطفا مجددا تلاش نمایید.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      toast({
        title: 'خطا در ثبت‌نام',
        description: 'خطایی رخ داده است، لطفا مجددا تلاش نمایید.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      maxW="7xl"
      height={'80vh'}
      p={{ base: 5, md: 10 }}
    >
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">ثبت‌نام</Heading>
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
                <Input
                  rounded="md"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              {/* <FormControl id="username">
                <FormLabel>نام کاربری</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl> */}
              <FormControl id="password">
                <FormLabel>رمزعبور</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputLeftElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? 'مخفی' : 'نمایان'}
                    </Button>
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>تکرار رمزعبور</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputLeftElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      onClick={handleConfirmPasswordToggle}
                    >
                      {showConfirmPassword ? 'مخفی' : 'نمایان'}
                    </Button>
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%" justify={'center'} align={'center'}>
              <Button
                bg="telegram.500"
                color="white"
                onClick={handleRegister}
                isLoading={loading}
                loadingText="در حال ثبت‌نام..."
                rounded="md"
                w="100%"
              >
                ثبت‌نام
              </Button>
              <Link href="/auth/login" fontSize={{ base: 'md', sm: 'md' }}>
                ورود
              </Link>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SimpleSignIn;
