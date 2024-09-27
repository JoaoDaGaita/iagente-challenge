import type { DefaultSession } from 'next-auth'

export interface UserAuth extends DefaultSession {
  username: string
  password: string
}
