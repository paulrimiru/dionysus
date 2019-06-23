import { User } from '../types';
import { Db } from '../utils/db';
import { loginUserLoader, registerUserLoader } from './loaders';

export type UserContext = ReturnType<typeof userContext>;

export const userContext = (db: Db, currentUser: User | undefined) => {
  const registerUser = registerUserLoader(db);
  const loginUser = loginUserLoader(db);
  const getCurrentUser = () => currentUser!;

  return {
    user: {
      getCurrentUser,
      registerUser,
      loginUser
    }
  }
}