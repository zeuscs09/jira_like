<script setup lang="ts">
import { useLayout } from './layout/composables/layout'
import AppTopbar from './layout/AppTopbar.vue'
import AppSidebar from './layout/AppSidebar.vue'

const { layoutState, containerClass } = useLayout()
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar />
    <AppSidebar />
    <div class="layout-main">
      <router-view></router-view>
    </div>
  </div>
</template>