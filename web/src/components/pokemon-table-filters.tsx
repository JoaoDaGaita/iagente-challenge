import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/app/hooks/useDebounce'

export type PokemonFilter = {
  name?: string
  type?: string
}

type PokemonListFilters = {
  onChange: (filters: PokemonFilter) => void
}

export function PokemonTableFilter({ onChange }: PokemonListFilters) {
  const [name, setName] = useState<PokemonFilter['name']>()
  const [type, setType] = useState<PokemonFilter['type']>()
  const debouncedName = useDebounce(name)
  const debouncedType = useDebounce(type)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onChange({ name: debouncedName, type: debouncedType })
  }, [debouncedName, debouncedType])

  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        onChange={e => setName(e.target.value)}
        placeholder="Nome do pokemon"
        className="h-8 w-[320px]"
      />
      <Input
        placeholder="Atributo primário"
        className="h-8 w-auto"
        onChange={e => setType(e.target.value)}
      />

      <Button type="button" variant="secondary" size={'sm'}>
        <Search className="h-4 w-4 mr-2" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size={'sm'}>
        <Search className="h-4 w-4 mr-2" />
        Remover resultados
      </Button>
    </form>
  )
}
