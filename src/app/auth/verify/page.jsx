'use client'
import { useState, useEffect } from 'react';
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
import { usePathname, useSearchParams } from 'next/navigation'



const VERIFY_SMS_MUTATION = gql`
  mutation VerifySms($verifySmsCode: String!, $verifySmsPhoneNumber: String!) {
    verifySms(code: $verifySmsCode, phoneNumber: $verifySmsPhoneNumber) {
      success
    }
  }
`;

const RESEND_SMS_MUTATION = gql`
    mutation ResendVerificationSms($resendVerificationSmsPhoneNumber: String!) {
        resendVerificationSms(phoneNumber: $resendVerificationSmsPhoneNumber) {
             success
        }
  } 
`;

const VerifySms = () => {

  const searchParams = useSearchParams()

  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(searchParams.get('phoneNumber'));
  console.log(searchParams[0])
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);


  const [verifySms, { loading: verifyLoading }] = useMutation(VERIFY_SMS_MUTATION);
  const [resendSms, { loading: resendLoadingState }] = useMutation(RESEND_SMS_MUTATION);
  const router = useRouter();
  const toast = useToast();


  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const handleVerify = async () => {
    try {
      const { data } = await verifySms({
        variables: {
          verifySmsCode: code,
          verifySmsPhoneNumber: phoneNumber,
        },
      });

      const success = data?.verifySms?.success;

      if (success) {
        // Verification successful, redirect to /auth/login
        console.log('Verification successful!');
        toast({
          title: 'Verification Successful',
          description: 'You can now log in.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/auth/login');
      } else {
        console.error('Verification failed');
        toast({
          title: 'Verification Failed',
          description: 'Invalid verification code. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during verification:', error.message);
      toast({
        title: 'Verification Failed',
        description: 'An error occurred during verification. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleResendSms = async () => {
    try {
      setResendLoading(true);

      const { data } = await resendSms({
        variables: {
          resendSmsPhoneNumber: phoneNumber,
        },
      });

      const success = data?.resendSms?.success;

      if (success) {
        console.log('Resend SMS successful!');
        toast({
          title: 'Resend SMS Successful',
          description: 'SMS has been resent. Please check your phone.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Resend SMS failed');
        toast({
          title: 'Resend SMS Failed',
          description: 'An error occurred during resend. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during resend SMS:', error.message);
      toast({
        title: 'Resend SMS Failed',
        description: 'An error occurred during resend. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

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
            <Heading fontSize="2xl">تایید شماره</Heading>
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
              <FormControl id="code">
                <FormLabel>کد تایید</FormLabel>
                <Input
                  rounded="md"
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </FormControl>
            </VStack>
            <VStack w="100%" justify={'center'} align={'center'}>
              <Button
                bg="telegram.500"
                color="white"
                onClick={handleVerify}
                isLoading={verifyLoading}
                loadingText="در حال تایید..."
                rounded="md"
                w="100%"
              >
                تایید
              </Button>
              <Button
                bg="gray.300"
                color="white"
                onClick={handleResendSms}
                isLoading={resendLoading}
                loadingText="در حال ارسال..."
                rounded="md"
                w="100%"              
                isDisabled={countdown > 0 || resendLoading}
              >
                {countdown > 0 ? `ارسال مجدد کد (${countdown} ثانیه دیگر)` : 'ارسال مجدد کد'}

              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default VerifySms;
