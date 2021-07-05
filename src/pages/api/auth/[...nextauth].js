import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
require('../../../models/connection')
import UserSchema from '../../../models/User'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile){
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture
          }
      }
    })
    //add more providers here
  ],
  database: process.env.MONGODB_URL,
  callbacks: {
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true;

      const already_exists = await UserSchema.findOne({
        email: user.email
      });

      if (!already_exists) {
        try {
          await UserSchema.create({
            name: user.name,
            email: user.email
          });

          return isAllowedToSignIn;
        } catch (error) {
          // @TODO: LOG ERROR
        }
      }
    }
  }
})