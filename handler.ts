import { ApolloServer, gql } from 'apollo-server-lambda';
import * as fs from 'fs';

import { resolvers } from './src/resolvers';
import { data } from './src/data';
import query from './src/schema.graphql';

const server = new ApolloServer({
  typeDefs: query,
  resolvers,
  context: { data },
  introspection: true,
  playground: true,
} as any)

exports.graphqlHandler = server.createHandler();
