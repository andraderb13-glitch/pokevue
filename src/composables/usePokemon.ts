import { computed, ref } from 'vue'
import { getPokemon } from '../services/pokeapi'
import type { Pokemon } from '../types/pokemon'

const LAST_POKEMON_KEY = 'pokedex-last-pokemon'

export function usePokemon() {
  const pokemon = ref<Pokemon | null>(null)
  const searchText = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')
  const soundEnabled = ref(false)

  const primaryType = computed(() => pokemon.value?.types[0]?.name ?? 'normal')

  async function searchPokemon(query: string | number) {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const result = await getPokemon(query)
      pokemon.value = result
      searchText.value = result.name
      try {
        localStorage.setItem(LAST_POKEMON_KEY, result.name)
      } catch {
        // A aplicação continua funcionando se o navegador bloquear o armazenamento.
      }
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'
    } finally {
      isLoading.value = false
    }
  }

  async function navigatePokemon(direction: -1 | 1) {
    const currentId = pokemon.value?.id ?? 1
    const nextId = Math.min(1025, Math.max(1, currentId + direction))
    await searchPokemon(nextId)
  }

  async function loadLastPokemon() {
    let lastPokemon = 'pikachu'
    try {
      lastPokemon = localStorage.getItem(LAST_POKEMON_KEY) || 'pikachu'
    } catch {
      // Usa Pikachu como padrão se localStorage estiver indisponível.
    }
    await searchPokemon(lastPokemon)
  }

  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
  }

  return {
    pokemon,
    searchText,
    isLoading,
    errorMessage,
    soundEnabled,
    primaryType,
    searchPokemon,
    navigatePokemon,
    loadLastPokemon,
    toggleSound,
  }
}
