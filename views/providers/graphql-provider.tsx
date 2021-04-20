import * as React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  credentials : "include",
  uri : "/graphql",
  cache: new InMemoryCache()
})


export const GraphqlProvider = ({children}: any) => (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
