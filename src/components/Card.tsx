'use client'

// components/Card.tsx
import { Box, Heading, Image } from '@chakra-ui/react';

interface CardProps {
  title: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={4} p={4}>
    <Image src={imageUrl} alt={title} />
    <Heading mt={2} fontSize="xl">
      {title}
    </Heading>
  </Box>
);

export default Card;
