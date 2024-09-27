'use client'

import { z } from 'zod'
import Image from 'next/image'
import ash from '@/app/assets/ash.png'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const signInForm = z.object({
  username: z.string(),
  password: z.string().min(4),
})

type SignInForm = z.infer<typeof signInForm>

export default function SignIn() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (!result?.ok) {
      toast.error('Invalid credentials.')
      return
    }

    toast.success('Welcome to IAgente')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="w-[320px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acesse sua pokedex
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe seus pokemons pelo painel!
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={ash}
            style={{ width: 'auto', height: 'auto' }}
            alt={''}
            width={200}
            height={200}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-4">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register('username')} />

            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />

            <Button
              className="w-full hover:opacity-35"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </div>

          <div className="flex items-center justify-center hover:opacity-35">
            <Link href="/sign-up">sign-up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
