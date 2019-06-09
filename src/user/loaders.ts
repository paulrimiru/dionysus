import * as DataLoader from 'dataloader';

import { User } from '../types';
import { Db } from '../utils/db';
import { loginUser, LoginUserSpec, registerUser, RegisterUserSpec } from './model';

export const registerUserLoader = (db: Db) =>
  new DataLoader<RegisterUserSpec, User>(async (keys: RegisterUserSpec[]) => {
    return Promise.all(
      keys.map(async (userDetails) => await registerUser({ db, ...userDetails }))
    );
  });

export const loginUserLoader = (db: Db) =>
  new DataLoader<LoginUserSpec, { token: string, user: User }>(async (keys: LoginUserSpec[]) => {
    return await Promise.all(
      keys.map(async (userDetails) => await loginUser({ db, ...userDetails }))
    );
  });
