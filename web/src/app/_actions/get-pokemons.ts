import axios from 'axios'
import { getPokemonDetails } from './get-pokemon-details'

interface PokemonFilters {
  url: string
  name?: string
  type?: string
  offset?: number
  limit?: number
  pageIndex: number
}

interface Result {
  name: string
  url?: string
}

interface GetPokemonsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
  limit: number
}

export async function getPokemons({
  url,
  limit,
  offset,
  type,
  name,
  pageIndex,
}: PokemonFilters) {
  const response = await axios.get<GetPokemonsResponse>(url, {
    params: { limit, offset, name, type, page: pageIndex },
  })

  const promiseArr = response.data.results.map(async pokemon =>
    getPokemonDetails(pokemon.name)
  )

  const resultsPromise = await Promise.all(promiseArr)

  // biome-ignore lint/style/useConst: <explanation>
  let filteredPokemons = resultsPromise

  if (name) {
    filteredPokemons = filteredPokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(name.toLowerCase())
    })
  }

  if (type) {
    filteredPokemons = filteredPokemons.filter(pokemon => {
      return pokemon.types[0].type.name
        .toLowerCase()
        .includes(type.toLowerCase())
    })
  }

  return {
    ...response.data,
    results: filteredPokemons,
  }
}
