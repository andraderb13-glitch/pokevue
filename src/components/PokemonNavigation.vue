<script setup lang="ts">
defineProps<{
  pokemonId: number | null
  loading: boolean
}>()

const emit = defineEmits<{
  navigate: [direction: -1 | 1]
}>()
</script>

<template>
  <nav class="pokemon-navigation" aria-label="Navegar entre Pokémon">
    <button
      type="button"
      :disabled="loading || pokemonId === 1"
      @click="emit('navigate', -1)"
    >
      <span>←</span>
      <span><small>ANTERIOR</small><b>Pokémon</b></span>
    </button>
    <div class="nav-center"><span></span><span></span><span></span></div>
    <button
      type="button"
      :disabled="loading || pokemonId === 1025"
      @click="emit('navigate', 1)"
    >
      <span><small>PRÓXIMO</small><b>Pokémon</b></span>
      <span>→</span>
    </button>
  </nav>
</template>
