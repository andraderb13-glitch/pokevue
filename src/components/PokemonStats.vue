<script setup lang="ts">
import type { PokemonStat } from '../types/pokemon'

defineProps<{
  stats: PokemonStat[]
}>()
</script>

<template>
  <section class="stats-card">
    <div class="stats-heading">
      <div>
        <span class="field-label">ANÁLISE BIOMÉTRICA</span>
        <h3>Atributos base</h3>
      </div>
      <span class="stats-count">06 PARÂMETROS</span>
    </div>
    <div class="stats-list">
      <div v-for="stat in stats" :key="stat.name" class="stat-row">
        <span class="stat-label">{{ stat.label }}</span>
        <div class="stat-track">
          <div
            class="stat-fill"
            :style="{ width: `${Math.min(100, (stat.value / 180) * 100)}%` }"
          ></div>
        </div>
        <strong class="stat-value">{{ stat.value }}</strong>
      </div>
    </div>
    <p class="stats-note">* Valores base oficiais. A escala visual é limitada a 180 pontos.</p>
  </section>
</template>
