import React from 'react';
import './App.css';
import { Home } from './Home';
import { Header } from './Header';
import { Footer } from './Footer';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <>
      <Header />
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
      <Footer />
    </>
  );
};

export default App;
