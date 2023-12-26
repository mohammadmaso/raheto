import { Box, Button, Text, HStack } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth'; // Update with the actual path

const TrackLearning = () => {
  const { isLoggedIn } = useAuth();

  return (
    <HStack spacing={4} align="center" justify="center" size="sm">
      {isLoggedIn ? (
        <Box>
          <Text fontSize="sm" textAlign="center">
            <span role="img" aria-label="success-icon">
              ✅
            </span>{' '}
            موفقیت آمیز! شما می‌توانید پیشرفت یادگیری خود را پیگیری کنید.
          </Text>
        </Box>
      ) : (
        <HStack>
          <Text fontSize="sm" textAlign="center">
            برای پیگیری پیشرفت یادگیری خود وارد شوید.
          </Text>
          <Button
            size="sm"
            onClick={() => {
              // Redirect to the login page
              // Update the pathname as needed
              window.location.href = '/auth/login';
            }}
          >
            ورود
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default TrackLearning;
