// Import necessary libraries
import { Box, Grid, Link, Heading, Divider, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import gql from "graphql-tag";

// Define the GraphQL query
const ALL_CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories {
      edges {
        node {
          id
          titleFa
          titleEn
        }
      }
    }
  }
`;

// Create the Categories component
const Categories = () => {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(ALL_CATEGORIES_QUERY);

  // Use the useRouter hook to navigate to category pages
  const router = useRouter();

  if (loading) return (
    <Box  height={"10vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        textAlign={"center"}
        thickness='2px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='md'
      />
    </Box>);
    
    if (error) return <p>خطا: {error.message}</p>;

  return (
    <Box p={4}>
      <Heading as="h2" fontSize="xl" mb={4}>
        دسته‌بندی نقشه‌راه‌ها
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {data.allCategories.edges.map(({ node }) => (
          <Link
            key={node.id}
            p={4}
            borderRadius="md"
            bg={"telegram.100"}
            transition="0.5s ease"
            _hover={{
              bg: "telegram.700",
              color: "white",
              transform: "scale(1.05)",
            }}
            onClick={() =>
              router.push(`/maps/category/${node.titleEn}`)
            }
          >
            <Heading as="h3" fontSize="lg" mb={2}>
              {node.titleFa}
            </Heading>
            <Divider colorScheme="telegram"/>
            <Heading as="h4" fontSize="sm" mt={2}>
              {node.titleEn}
            </Heading>
          </Link>
        ))}
      </Grid>
      <Divider m={4} />

    </Box>
  );
};

export default Categories;
