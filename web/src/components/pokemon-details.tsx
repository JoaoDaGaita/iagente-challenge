import type { PokemonDetail } from '@/app/api/model/pokemon-detail'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Table, TableBody, TableCell, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'

export interface PokemonDetailProps {
  pokemon: PokemonDetail
}

const pokemonFav = JSON.parse(
  sessionStorage.getItem('pokemonFav') || '[]'
) as string[]

export function PokemonDetails({ pokemon }: PokemonDetailProps) {
  function handleFavoritePokemon(pokemonName: string) {
    pokemonFav.push(pokemonName)
    sessionStorage.setItem('pokemonFav', JSON.stringify(pokemonFav))
  }

  return (
    <DialogContent>
      <DialogHeader className="flex flex-row items-center justify-between p-4">
        <div>
          <DialogTitle>Pokemon</DialogTitle>
          <DialogDescription>Detalhes do Pokemon</DialogDescription>
        </div>
        <Button onClick={() => handleFavoritePokemon(pokemon.name)}>
          <Heart className="hover:text-red-500 hover:fill-red-500" />
        </Button>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Nome</TableCell>
              <TableCell className="flex justify-end">{pokemon.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Tipo</TableCell>
              <TableCell className="flex justify-end">
                {pokemon.types[0].type.name}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
