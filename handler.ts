import { ApolloServer } from 'apollo-server-lambda';

import { buildContext, getSchema } from './src/context';

export const server = new ApolloServer({
  schema: getSchema(),
  context: buildContext,
  introspection: true,
  playground: true,
} as any)

export const graphqlHandler = server.createHandler(
  {
    cors: {
      origin: '*',
      credentials: true,
    },
  }
);
