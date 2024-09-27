'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { updateUser } from '../_actions/update-user'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

const userUpdateForm = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string().min(4),
})

type UserUpdateForm = z.infer<typeof userUpdateForm>

export default function AccountSettings() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserUpdateForm>()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/sign-in')
    },
  })

  const { mutateAsync: updateUserResult } = useMutation({
    mutationFn: updateUser,
  })

  async function handleUpdateUser(data: UserUpdateForm) {
    try {
      await updateUserResult({
        id: session?.user.id,
        username: data.username,
        password: data.password,
      })

      toast.success('Usuário atualizado com sucesso.')
      router.push('/')
    } catch (error) {
      toast.error('Erro ao atualizar usuário.')
      return error
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <h1 className="text-foreground text-2xl pb-4">
        Configurações do Usuário
      </h1>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="flex flex-col justify-center w-[500px] border p-10 rounded-md space-y-5"
      >
        <Label className="text-xl">Username</Label>
        <Input placeholder="Informe novo username" {...register('username')} />
        <Label className="text-xl">Senha</Label>
        <Input placeholder="Informe nova senha" {...register('password')} />
        <Button type="submit" className="bg-zinc-800 hover:opacity-50">
          Atualizar
        </Button>
      </form>
    </div>
  )
}
