import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: DefaultUser
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string
    SMTP_GMAIL_PASS: string
  }
}
