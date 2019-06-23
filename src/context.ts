import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import { APIGatewayEvent } from 'aws-lambda';
import { makeExecutableSchema } from 'graphql-tools';

import { User } from './types';
import * as user from './user';
import { createDb } from './utils/db';

export type Context = user.UserContext;

const getUser = (token: string | undefined): User | undefined => {
  try {
    return token ? jwt.verify(token, process.env.SECRET!) as User : undefined;
  } catch (err) {
    return undefined
  }
}

export const getSchema = () => {
  const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf8')

  return makeExecutableSchema(
    {
      typeDefs,
      resolvers: [user.resolver] as any,
      inheritResolversFromInterfaces: true
    }
  );
}

export interface ContextSpec {
  event?: APIGatewayEvent
}

export const buildContext = ({ event }: ContextSpec): Context => {
  const token = getToken(event);
  const currentUser = getUser(token);
  const db = createDb({ tablePrefix: process.env.DYNAMODB_TABLE_PREFIX! });

  return {
    ...user.userContext(db, currentUser)
  }
}

function getToken(event) {
  if (event) {
    const tokenWithBearer: string | undefined = event.headers.authorization;
  
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(' ');
      if (token[0] !== 'Bearer') {
        throw new Error('Please provide a valid token format --> Bearer: {token} ')
      }
      return token[1];
    }
  }
}

