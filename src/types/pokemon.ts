export interface PokemonStat {
  name: string
  label: string
  value: number
}

export interface PokemonType {
  name: string
  label: string
}

export interface Pokemon {
  id: number
  name: string
  displayName: string
  image: string
  artwork: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  cries?: {
    latest?: string
    legacy?: string
  }
}

export interface PokeApiPokemon {
  id: number
  name: string
  height: number
  weight: number
  types: Array<{
    slot: number
    type: { name: string; url: string }
  }>
  stats: Array<{
    base_stat: number
    stat: { name: string }
  }>
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
      home?: {
        front_default: string | null
      }
    }
  }
  cries?: {
    latest?: string
    legacy?: string
  }
}
