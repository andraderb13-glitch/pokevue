<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'

defineProps<{
  pokemon: Pokemon | null
  primaryType: string
}>()
</script>

<template>
  <div class="device-wrap" :class="`device-${primaryType}`">
    <div class="device-hinge"></div>
    <div class="device-body">
      <div class="device-top">
        <div class="lens-cluster">
          <span class="lens-main"><i></i></span>
          <span class="lens-small lens-red"></span>
          <span class="lens-small lens-yellow"></span>
          <span class="lens-small lens-green"></span>
        </div>
        <div class="device-brand"><span>POKÉ</span>DEX <small>PRO</small></div>
        <div class="device-model">PDX<br><b>01</b></div>
      </div>
      <div class="screen-bezel">
        <div class="bezel-label"><span>DISPLAY</span><span>OLED · COLOR</span></div>
        <slot name="screen" />
      </div>
      <div class="device-controls">
        <div class="control-cross" aria-hidden="true">
          <span class="cross-up"></span><span class="cross-left"></span>
          <span class="cross-center"></span><span class="cross-right"></span><span class="cross-down"></span>
        </div>
        <div class="control-speaker" aria-hidden="true"><i v-for="n in 5" :key="n"></i></div>
        <div class="control-buttons" aria-hidden="true"><span>B</span><span>A</span></div>
      </div>
      <div class="device-bottom">
        <span class="device-led"></span>
        <span>POKÉLAB RESEARCH SYSTEM</span>
        <span class="device-serial">NO. 000001</span>
      </div>
    </div>
  </div>
</template>
