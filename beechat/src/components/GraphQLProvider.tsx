import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import useMount from './useMount';
import React, {useContext, useRef} from 'react';
import StorageContext from './StorageContext';
import AsyncStorage from '@react-native-community/async-storage';

const GraphQLProvider = (props: {children: React.ReactNode}) => {
  const httpLink = createHttpLink({
    uri: `${$config.BACKEND_ENDPOINT}/query`,
  });
  const {store} = useContext(StorageContext);
  const authLink = setContext(async (_, {headers}) => {
    const storeString = await AsyncStorage.getItem('store');
    let token;
    if (storeString) {
      token = JSON.parse(storeString).token;
    }
    console.log('link module token', storeString);
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } else {
      return headers;
    }
  });

  const client = useRef(
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    }),
  );

  console.log('GraphQL render triggered', store);

  return (
    <ApolloProvider client={client.current}>{props.children}</ApolloProvider>
  );
};

export default GraphQLProvider;
