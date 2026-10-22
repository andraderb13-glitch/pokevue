<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'

defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <article class="info-card">
    <div class="info-card-top">
      <div>
        <span class="field-label">NOME REGISTRADO</span>
        <h3>{{ pokemon.displayName }}</h3>
      </div>
      <span class="info-id">#{{ String(pokemon.id).padStart(3, '0') }}</span>
    </div>
    <div class="info-types">
      <span
        v-for="type in pokemon.types"
        :key="type.name"
        class="type-chip"
        :class="`type-${type.name}`"
      >{{ type.label }}</span>
    </div>
    <div class="info-divider"></div>
    <div class="physical-data">
      <div>
        <span class="field-label">ALTURA</span>
        <strong>{{ (pokemon.height / 10).toFixed(1) }} <small>m</small></strong>
      </div>
      <div>
        <span class="field-label">PESO</span>
        <strong>{{ (pokemon.weight / 10).toFixed(1) }} <small>kg</small></strong>
      </div>
      <div>
        <span class="field-label">ESPÉCIE</span>
        <strong class="species-name">Pokémon</strong>
      </div>
    </div>
  </article>
</template>
