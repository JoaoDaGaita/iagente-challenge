import { Search, ArrowRight, X } from 'lucide-react'
import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'
import Image from 'next/image'
import type { PokemonDetail } from '@/app/api/model/pokemon-detail'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { PokemonDetails } from './pokemon-details'

export interface PokemonProps {
  pokemon: PokemonDetail
}

export function PokemonTableRow({ pokemon }: PokemonProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalher do Pokemon</span>
            </Button>
          </DialogTrigger>
          <PokemonDetails pokemon={pokemon} />
        </Dialog>
      </TableCell>
      <TableCell>
        <Image
          src={pokemon.sprites.other.dream_world.front_default ?? ''}
          style={{ width: '40px', height: '40px' }}
          width={40}
          height={40}
          alt={''}
        />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {pokemon.name}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {pokemon.types[0].type.name}
      </TableCell>
      {/* <TableCell className="text-muted-foreground">{pokemon.url}</TableCell> */}
    </TableRow>
  )
}
