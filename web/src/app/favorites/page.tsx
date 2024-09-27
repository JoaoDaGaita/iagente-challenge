'use client'

import { Header } from '@/components/header'
import { useQueries } from '@tanstack/react-query'

export default function Favorites() {
  const aux = JSON.parse(
    sessionStorage.getItem('pokemonFav') || '[]'
  ) as string[]

  const setOfFavorites = Array.from(new Set(aux.filter(n => n))).join(' ')
  const favorites = Array.from(setOfFavorites).map(poke => poke)

  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl">Pokemons Favoritos:</h1>
        {favorites}
      </div>
    </>
  )
}
