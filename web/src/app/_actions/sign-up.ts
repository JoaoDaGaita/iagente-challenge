import { api } from '@/lib/axios'

export interface SignUpBody {
  email: string
  username: string
  password: string
}

export async function signUp({ email, username, password }: SignUpBody) {
  await api.post('/sign-up', { email, username, password })
}
