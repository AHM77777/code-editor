import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
  ]
})