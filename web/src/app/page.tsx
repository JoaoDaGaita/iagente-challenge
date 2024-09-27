'use client'
import { Header } from '@/components/header'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { PokemonTableRow } from '@/components/pokemon-table-row'
import { getPokemons } from './_actions/get-pokemons'
import {
  PokemonTableFilter,
  type PokemonFilter,
} from '@/components/pokemon-table-filters'
import { Pagination } from '@/components/pagination'

import { z } from 'zod'
import {
  useSearchParams,
  useRouter,
  usePathname,
  type ReadonlyURLSearchParams,
  redirect,
} from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export default function Home() {
  const [name, setName] = useState<PokemonFilter['name']>()
  const [type, setType] = useState<PokemonFilter['type']>()
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/sign-in')
    },
  })

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const limit = z.coerce.number().optional().parse(searchParams.get('limit'))

  const offset = z.coerce
    .number()
    .optional()
    .parse(searchParams.get('offset') ?? pageIndex * 20)

  const { data: result } = useQuery({
    queryKey: ['pokemons', url, limit, offset, pageIndex, name, type],
    queryFn: () => getPokemons({ url, limit, name, offset, pageIndex, type }),
  })

  function handlePaginate(pageIndex: number, url?: string) {
    setUrl(url!)
    const page = new URLSearchParams(searchParams.toString())
    page.set('page', (pageIndex + 1).toString())
    router.push(createUrl(pathname, page))
  }

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header username={session?.user.username} />
      <div className="flex flex-col gap-4 p-8 pt-6 flex-1">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Pokemons</h1>
        </div>
        <div className="space-y-2.5">
          <PokemonTableFilter
            onChange={filters => {
              setName(filters.name)
              setType(filters.type)
            }}
          />
        </div>

        <div className="rounded-md border w-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">1</TableHead>
                <TableHead className="w-[180px]">Image</TableHead>
                <TableHead className="w-[340px]">Nome</TableHead>
                <TableHead className="w-[180px]">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.results.map(pokemon => {
                return <PokemonTableRow key={pokemon.id} pokemon={pokemon} />
              })}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            pageIndex={pageIndex}
            count={result.count}
            limit={limit || 20}
            onPageChange={handlePaginate}
            previous={result.previous}
            next={result.next}
          />
        )}
      </div>
    </div>
  )
}
