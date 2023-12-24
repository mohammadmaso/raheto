import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://raheto.panel.0be1.ir/api/',
  cache: new InMemoryCache(),
});

