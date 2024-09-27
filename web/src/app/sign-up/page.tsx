'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import Image from 'next/image'
import React from 'react'
import ash from '@/app/assets/ash.png'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { signUp } from '../_actions/sign-up'
import { toast } from 'sonner'

const signUpForm = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
})

type SignUpForm = z.infer<typeof signUpForm>

export default function SignUp() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: createUser } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await createUser({
        email: data.email,
        username: data.username,
        password: data.password,
      })

      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Usuário criado com sucesso.')
      router.push('/sign-in')
    } catch (error) {
      toast.error('Erro ao criar usuário.')
      return error
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="w-[320px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Comece sua jornada pokemon!
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={ash}
            alt={''}
            style={{ width: 'auto', height: 'auto' }}
            width={200}
            height={200}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="username">Nome do usuário</Label>
            <Input id="username" type="text" {...register('username')} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />

            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
