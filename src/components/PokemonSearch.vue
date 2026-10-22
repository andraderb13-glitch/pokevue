<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  loading: boolean
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

const query = ref(props.modelValue)

watch(() => props.modelValue, (value) => {
  query.value = value
})

function submitSearch() {
  const value = query.value.trim()
  if (value && !props.loading) emit('search', value)
}
</script>

<template>
  <form class="search-card" @submit.prevent="submitSearch">
    <label for="pokemon-search" class="search-label">PESQUISA DE ESPÉCIE</label>
    <div class="search-row">
      <span class="search-symbol">⌕</span>
      <input
        id="pokemon-search"
        v-model="query"
        type="search"
        placeholder="Nome ou número do Pokémon..."
        autocomplete="off"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading || !query.trim()">
        {{ loading ? 'BUSCANDO...' : 'BUSCAR' }}
        <span aria-hidden="true">↗</span>
      </button>
    </div>
    <div class="search-hint">
      <span>EX.: PIKACHU, CHARIZARD, 25</span>
      <span class="api-indicator"><i></i> API ONLINE</span>
    </div>
  </form>
</template>
