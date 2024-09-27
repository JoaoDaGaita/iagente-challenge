interface GetPokemonRequestProps {
  name?: string
  type?: string
}

const POKEMON_API = 'https://pokeapi.co/api/v2/'

export async function getPokemon({ name }: GetPokemonRequestProps) {
  const response = await fetch(`${POKEMON_API}pokemon/${name}`)
  const data = await response.json()
  return data
}
