import axios from 'axios'
import type { PokeApiPokemon, Pokemon, PokemonStat, PokemonType } from '../types/pokemon'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Atq. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidade',
}

const typeLabels: Record<string, string> = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
  grass: 'Planta', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno',
  ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
  steel: 'Aço', fairy: 'Fada',
}

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function normalizePokemon(data: PokeApiPokemon): Pokemon {
  const stats: PokemonStat[] = data.stats.map((item) => ({
    name: item.stat.name,
    label: statLabels[item.stat.name] ?? titleCase(item.stat.name),
    value: item.base_stat,
  }))

  const types: PokemonType[] = data.types.map((item) => ({
    name: item.type.name,
    label: typeLabels[item.type.name] ?? titleCase(item.type.name),
  }))

  const artwork =
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.other?.home?.front_default ??
    data.sprites.front_default ??
    ''

  return {
    id: data.id,
    name: data.name,
    displayName: titleCase(data.name),
    image: data.sprites.front_default ?? artwork,
    artwork,
    height: data.height,
    weight: data.weight,
    types,
    stats,
    cries: data.cries,
  }
}

export async function getPokemon(query: string | number): Promise<Pokemon> {
  const normalizedQuery = String(query).trim().toLowerCase()
  if (!normalizedQuery) {
    throw new Error('Digite o nome ou número de um Pokémon.')
  }

  try {
    const response = await api.get<PokeApiPokemon>(
      `/pokemon/${encodeURIComponent(normalizedQuery)}`,
    )
    return normalizePokemon(response.data)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Pokémon não encontrado. Confira o nome ou número.')
    }
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('A consulta demorou demais. Tente novamente.')
    }
    throw new Error('Não foi possível conectar à PokéAPI. Verifique a internet.')
  }
}
