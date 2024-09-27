'use client'

import { Header } from '@/components/header'
import { useQueries } from '@tanstack/react-query'
import { getPokemonDetails } from '../_actions/get-pokemon-details'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Favorites() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/sign-in')
    },
  })

  const sessionFavorites = JSON.parse(
    sessionStorage.getItem('pokemonFav') || '[]'
  ) as string[]

  const setOfFavorites = Array.from(new Set(sessionFavorites.filter(n => n)))
    .join(' ')
    .split(' ')
  const favorites = Array.from(setOfFavorites).map(poke => poke)

  const result = useQueries({
    queries: favorites.map(pokemon => ({
      queryKey: ['favorites', pokemon],
      queryFn: () => getPokemonDetails(pokemon),
    })),
  })

  return (
    <>
      <Header />
      {sessionFavorites.length === 0 ? (
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl">Não há nenhuma pokemon favorito!</h1>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl">Pokemons Favoritos:</h1>
          <div className="flex flex-col items-center gap-5">
            {result.map(pokemon => (
              <div
                className="flex flex-1 flex-col items-center justify-center space-y-4"
                key={pokemon.data?.id}
              >
                <img
                  key={pokemon.data?.id}
                  src={pokemon.data?.sprites?.other?.dream_world?.front_default}
                  width={
                    pokemon.data?.sprites?.other?.dream_world?.front_default
                      ? 40
                      : 0
                  }
                  height={
                    pokemon.data?.sprites?.other?.dream_world?.front_default
                      ? 40
                      : 0
                  }
                  alt={''}
                />
                <h2>{pokemon.data?.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
