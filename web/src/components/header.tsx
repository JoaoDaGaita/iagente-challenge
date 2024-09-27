'use client'
import Image from 'next/image'
import psyduck from '@/app/assets/psyduck.png'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

interface HeaderProps {
  username?: string | null
}

export function Header({ username }: HeaderProps) {
  const pathname = usePathname()

  function handleSignOut() {
    signOut()
    sessionStorage.removeItem('pokemonFav')
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <h2>Bem vindo {username}</h2>
        <Image
          src={psyduck}
          style={{ width: 'auto', height: 'auto' }}
          priority={true}
          alt={'psyduck'}
          width={40}
          height={30}
        />

        <Button onClick={() => handleSignOut()}>Logout</Button>

        <Separator orientation="vertical" className="h-10" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            data-current={pathname === '/'}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
          >
            Início
          </Link>

          <Link
            data-current={pathname === '/favorites'}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
            href="/favorites"
          >
            Favoritos
          </Link>

          <Link
            data-current={pathname === '/account-settings'}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
            href="/account-settings"
          >
            Configurações do Usuário
          </Link>
        </nav>
      </div>
    </div>
  )
}
