import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import connectDB from "@/app/db/connextDb"
import User from "@/app/models/User"

export  const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectDB()

        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
            profilepic: user.image,
            provider: account.provider,
            Title:"",
            Bio: "",
            socialLinks: {
             
            },
            isHaveplan: false,
            plan: "",
            ProfileVsitCount: 0,
            accountType:"public"

          })
          await newUser.save()
          user.name = newUser.username
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },

    async session({ session }) {
      try {
        await connectDB()
        const dbUser = await User.findOne({ email: session.user.email })

        if (dbUser) {
          session.user.name = dbUser.username
        }

        return session
      } catch (error) {
        console.error("Error in session callback:", error)
        return session
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
