import { api } from '@/lib/axios'

export async function getUserByUsername(username: string | undefined) {
  const response = await api.get(`/user/${username}`)
  return response.data
}
