import { Db } from './utils/db';

export interface Context {
  db: Db
  user?: User,
}

export interface User {
  id: string
  name: string;
  email: string;
}

export interface Auth {
  token: string;
  user: User;
}
