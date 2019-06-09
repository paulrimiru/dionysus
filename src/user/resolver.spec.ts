import * as snap from '@smpx/snap-shot-it';
import { assert } from 'chai';
import gql from 'graphql-tag';

import { createTestClient } from 'apollo-server-testing';
import { server } from '../../handler';
import { createDb, Db } from '../utils/db';
import { UserModel } from './model';

const {
  hashSync,
  genSaltSync
  // tslint:disable-next-line:no-var-requires
} = require('bcrypt-node');

const loginMutation = gql`
  mutation user($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        name
      }
    }
  }
`;

context('User', () => {
  let db: Db;
  const testPassword = '12345';

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(testPassword, salt);

  const testUserDetails = {
    name: 'test',
    email: 'test@email.com',
    password: hashedPassword
  }

  before(() => {
    db = createDb({ tablePrefix: process.env.DYNAMODB_TABLE_PREFIX! });
  });

  beforeEach(async () => {
    const user = new UserModel();

    user.name = testUserDetails.name;
    user.email = testUserDetails.email;
    user.password = testUserDetails.password;

    await db.mapper.put(user);
  });

  it('gets a token for an already registered user', async () => {
    const { query } = createTestClient(server as any);

    const result = await query({
      mutation: loginMutation,
      variables: {
        email: testUserDetails.email,
        password: testPassword
      },
    });

    assert.isDefined(result.data!.login.token);
    snap(result.data!.login.user);
  });
});
