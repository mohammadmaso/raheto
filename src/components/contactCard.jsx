import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import NextLink from "next/link";

const ContactCard = () => {
  return (
    <NextLink href="/contact" passHref>
        <Flex
          p="6"
          bg="telegram.500"
          color="white"
          borderRadius="lg"
          boxShadow="md"
          textAlign="center"
          align="center"
          justify="center"
          direction="column"
          height="100%"
          width="100%"
          transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}

        >
          <Icon as={FaPlus} boxSize={10} mb={4} />
          <Heading fontSize="lg" mb={2}>
            پیشنهاد نقشه راه
          </Heading>
        </Flex>
    </NextLink>
  );
};

export default ContactCard;
