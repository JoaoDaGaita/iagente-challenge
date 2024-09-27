import { api } from '@/lib/axios'

export async function getUserById(id: string) {
  const response = await api.get(`/user/${id}`)
  return response.data
}
