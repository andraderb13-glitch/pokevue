<script setup lang="ts">
import { onMounted } from 'vue'
import PokedexDevice from './components/PokedexDevice.vue'
import PokemonSearch from './components/PokemonSearch.vue'
import PokemonInfo from './components/PokemonInfo.vue'
import PokemonStats from './components/PokemonStats.vue'
import PokemonNavigation from './components/PokemonNavigation.vue'
import LoadingState from './components/LoadingState.vue'
import { usePokemon } from './composables/usePokemon'

import { ref } from 'vue'

const backgroundMusic = ref<HTMLAudioElement | null>(null)

async function handleSoundToggle() {
  const audio = backgroundMusic.value

  if (!audio) return

  if (!audio.paused) {
    audio.pause()
    return
  }

  try {
    audio.volume = 0.25
    await audio.play()
  } catch (error) {
    console.error('Erro ao reproduzir a música:', error)
  }
}

const {
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
} = usePokemon()

onMounted(() => {
  void loadLastPokemon()
})
</script>

<template>
  <main class="app-shell" :class="`theme-${primaryType}`">
    <header class="topbar">
      <a class="brand" href="#" aria-label="PokéLab início">
        <span class="brand-mark"><span></span></span>
        <span>POKÉ<span class="brand-light">LAB</span></span>
      </a>
      <div class="topbar-note">
        <span class="live-dot"></span>
        POKÉDEX DIGITAL <span class="topbar-divider">/</span> NATIONAL DATABASE
      </div>
    <button
  class="sound-toggle"
  type="button"
  :aria-pressed="soundEnabled"
  @click="handleSoundToggle"
>
  <span class="sound-icon">{{ soundEnabled ? '♫' : '♪' }}</span>
  {{ soundEnabled ? 'SOM ATIVO' : 'SOM DESATIVADO' }}
</button>

<audio
  ref="backgroundMusic"
  src="/sounds/1-01.%20Opening.mp3"
  loop
  preload="none"
/>
    </header>

    <section class="intro">
      <p class="eyebrow"><span></span> SISTEMA DE EXPLORAÇÃO POKÉMON</p>
      <h1>Conheça seu próximo <span>parceiro.</span></h1>
      <p class="intro-copy">
        Explore espécies, descubra atributos e consulte os dados do mundo Pokémon.
      </p>
    </section>

    <section class="workspace" aria-label="Pokédex">
      <div class="device-column">
        <PokedexDevice :pokemon="pokemon" :primary-type="primaryType">
          <template #screen>
            <div class="device-screen">
              <div class="screen-topline">
                <span>POKÉLAB OS</span>
                <span>DEX // {{ pokemon ? String(pokemon.id).padStart(4, '0') : '----' }}</span>
              </div>
              <LoadingState v-if="isLoading" />
              <div v-else-if="errorMessage" class="screen-error">
                <span class="error-symbol">!</span>
                <strong>BUSCA INTERROMPIDA</strong>
                <p>{{ errorMessage }}</p>
              </div>
              <div v-else-if="pokemon" class="screen-content">
                <div class="pokemon-id">Nº {{ String(pokemon.id).padStart(3, '0') }}</div>
                <img
                  class="pokemon-artwork"
                  :src="pokemon.artwork || pokemon.image"
                  :alt="pokemon.displayName"
                />
                <div class="screen-name">{{ pokemon.displayName }}</div>
                <div class="screen-types">
                  <span
                    v-for="type in pokemon.types"
                    :key="type.name"
                    class="type-chip"
                    :class="`type-${type.name}`"
                  >{{ type.label }}</span>
                </div>
              </div>
              <div v-else class="screen-empty">
                <div class="empty-orbit"><span>?</span></div>
                <strong>AGUARDANDO DADOS</strong>
                <p>Pesquise um Pokémon para iniciar a análise.</p>
              </div>
              <div class="screen-footer">
                <span class="screen-footer-dot"></span>
                CONEXÃO POKÉAPI
                <span class="screen-footer-status">{{ isLoading ? 'CONSULTANDO' : errorMessage ? 'ERRO' : 'PRONTO' }}</span>
              </div>
            </div>
          </template>
        </PokedexDevice>
        <div class="device-caption">
          <span class="caption-line"></span>
          <span>PDX-01 <b>·</b> FIELD RESEARCH DEVICE</span>
          <span class="caption-line"></span>
        </div>
      </div>

      <div class="data-column">
        <PokemonSearch
          :model-value="searchText"
          :loading="isLoading"
          @search="searchPokemon"
        />

        <div class="section-heading">
          <div>
            <p class="eyebrow">RELATÓRIO DE CAMPO</p>
            <h2>Dados do Pokémon</h2>
          </div>
          <span class="record-tag">{{ pokemon ? `REGISTRO #${pokemon.id}` : 'SEM REGISTRO' }}</span>
        </div>

        <PokemonInfo v-if="pokemon" :pokemon="pokemon" />
        <div v-else class="placeholder-card">
          <div class="placeholder-icon">◎</div>
          <strong>Seu próximo registro começa aqui</strong>
          <p>Digite um nome ou número acima para carregar a ficha do Pokémon.</p>
        </div>

        <PokemonStats v-if="pokemon" :stats="pokemon.stats" />
        <div v-else class="stats-placeholder">
          <span>HP</span><i></i>
          <span>ATK</span><i></i>
          <span>DEF</span><i></i>
        </div>

        <PokemonNavigation
          :pokemon-id="pokemon?.id ?? null"
          :loading="isLoading"
          @navigate="navigatePokemon"
        />
      </div>
    </section>

    <footer class="app-footer">
      <span>POKÉLAB <b>©</b> 2026</span>
      <span>FEITO PARA EXPLORAR <span class="footer-heart">◆</span> ALIMENTADO PELA POKÉAPI</span>
      <span class="footer-version">BUILD 1.0.0</span>
    </footer>
  </main>
</template>
