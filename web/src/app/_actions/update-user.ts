import { api } from '@/lib/axios'

export interface UpdateUserBody {
  id?: string
  username: string
  password: string
}

export async function updateUser({ id, username, password }: UpdateUserBody) {
  console.log(username, password, id)

  await api.put(`/update-user/${id}`, { username, password })
}
