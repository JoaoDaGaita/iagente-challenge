import axios from 'axios'
import type { PokemonDetail } from '../api/model/pokemon-detail'

export async function getPokemonDetails(name: string): Promise<PokemonDetail> {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`

  const response = await axios.get<PokemonDetail>(endpoint)

  return response.data
}
