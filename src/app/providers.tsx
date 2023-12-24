// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from "../theme"
import { client } from "../lib/apollo-client"
import { ApolloProvider } from '@apollo/client'
export function Providers({ children }: { children: React.ReactNode }) {
  return (<>
  <ApolloProvider client={client}>
  <ChakraProvider theme={theme}>
    {children}
    </ChakraProvider></ApolloProvider>
    </>)
}