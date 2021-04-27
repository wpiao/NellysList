import React from 'react';
import { Header } from './Header';
import { V2Home } from './V2Home';
import { Footer } from './Footer';
import { AdsProvider } from '../contexts/AdsContext';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

const V2App = () => {
  return (
    <>
      <Header />
      <AdsProvider>
        <ApolloProvider client={client}>
          <V2Home />
        </ApolloProvider>
      </AdsProvider>
      <Footer />
    </>
  );
};

export default V2App;
