import { IResolvers } from '../generated/graphql';
import { UserContext } from './context';

export const resolver: IResolvers<UserContext> = {
  Query: {
    currentUser: (parent, args, ctx) => ctx.user.getCurrentUser()
  },
  Mutation: {
    login: (parent, { email, password }, ctx) => ctx.user.loginUser.load({
      email,
      password
    }),
    createUser: (parent, { email, name, password }, ctx) => ctx.user.registerUser.load({
      email,
      name,
      password
    }),
  }
}