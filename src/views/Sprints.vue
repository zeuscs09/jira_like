<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

const sprints = ref([
  {
    id: '1',
    name: 'Sprint 1',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    status: 'ACTIVE'
  }
])
</script>

<template>
  <div class="sprints">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="m-0">Sprints</h1>
      <Button label="Create Sprint" icon="pi pi-plus" />
    </div>

    <div class="sprint-list">
      <div v-for="sprint in sprints" :key="sprint.id" class="sprint-card">
        <h3>{{ sprint.name }}</h3>
        <p>{{ sprint.startDate }} - {{ sprint.endDate }}</p>
        <Badge :value="sprint.status" severity="success" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sprints {
  padding: 1rem;
}

.sprint-list {
  max-width: 800px;
  margin: 0 auto;
}

.sprint-card {
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>