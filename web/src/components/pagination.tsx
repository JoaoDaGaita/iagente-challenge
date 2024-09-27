import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  count: number
  limit: number
  previous: string | null
  next: string | null
  onPageChange: (pageIndex: number, url?: string) => Promise<void> | void
}

export function Pagination({
  count,
  limit,
  pageIndex,
  previous,
  next,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(count / limit) || 1

  return (
    <div className="flex items-center justify-center">
      <span className="text-sm text-muted-foreground">
        Total de {count} pokemons
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(0)}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1, previous!)}
            disabled={!previous}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1, next!)}
            disabled={!next}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          {/* <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages)}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button> */}
        </div>
      </div>
    </div>
  )
}
