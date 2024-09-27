import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'

import { getUserByUsername } from '@/app/_actions/get-user-by-name'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await getUserByUsername(credentials?.username)

        if (!user) throw new Error('Invalid Credentials.')

        if (user.password !== credentials?.password)
          throw new Error('Invalid Credentials.')

        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },

    async session({ token, session }) {
      if (session?.user) session.user = token.user
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
