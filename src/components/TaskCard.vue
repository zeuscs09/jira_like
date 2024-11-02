<script setup lang="ts">
import type { Task } from '../types'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'

defineProps<{
  task: Task
}>()

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

const getAssigneeName = (assigneeId?: string) => {
  if (!assigneeId) return ''
  const teamMembers = {
    'john.doe': 'John Doe',
    'jane.smith': 'Jane Smith',
    'bob.johnson': 'Bob Johnson'
  }
  return teamMembers[assigneeId as keyof typeof teamMembers] || assigneeId
}
</script>

<template>
  <div class="task-card">
    <div class="flex justify-content-between align-items-center mb-2">
      <h3 class="task-title m-0">{{ task.title }}</h3>
      <Badge 
        :value="task.priority" 
        :severity="task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning' : 'info'" />
    </div>
    <p class="task-description m-0">{{ task.description }}</p>
    <div class="task-meta">
      <div class="flex justify-content-between align-items-center">
        <span class="task-date">Created {{ formatDate(task.createdAt) }}</span>
        <Tag v-if="task.assignee" :value="getAssigneeName(task.assignee)" severity="info" />
      </div>
      <div v-if="task.startDate || task.dueDate" class="task-timeline mt-2">
        <span v-if="task.startDate" class="text-sm">
          Start: {{ formatDate(task.startDate) }}
        </span>
        <span v-if="task.dueDate" class="text-sm">
          Due: {{ formatDate(task.dueDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--surface-card);
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  cursor: move;
  border: 1px solid var(--surface-border);
  transition: all 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.task-description {
  color: var(--text-color-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0.5rem 0;
}

.task-meta {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--surface-border);
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

.task-timeline {
  display: flex;
  justify-content: space-between;
  color: var(--text-color-secondary);
}

.text-sm {
  font-size: 0.875rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>