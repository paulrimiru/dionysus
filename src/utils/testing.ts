import { ApolloServer } from 'apollo-server-lambda';
import { createTestClient } from 'apollo-server-testing';

import { buildContext, getSchema } from '../context';

export const getTestClient = () => {
  const schema = getSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: buildContext
  });

  return createTestClient(apolloServer as any);
}
