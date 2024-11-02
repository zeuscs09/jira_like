<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from '../components/TaskForm.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import type { Task } from '../types'

const taskStore = useTaskStore()
const showTaskForm = ref(false)
const searchQuery = ref('')
const showFilters = ref(false)

const filters = {
  version: ref(null),
  epic: ref(null),
  type: ref(null)
}

const onSaveTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
  taskStore.addTask(task)
  showTaskForm.value = false
}

const filteredTasks = computed(() => {
  return taskStore.tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sprintTasks = computed(() => ({
  current: filteredTasks.value.filter(task => task.sprintId === 'current'),
  backlog: filteredTasks.value.filter(task => !task.sprintId)
}))
</script>

<template>
  <div class="backlog-container">
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-3">
      <span class="text-500">Projects</span>
      <i class="pi pi-angle-right text-500 mx-2"></i>
      <span class="text-500">Task Manager</span>
      <i class="pi pi-angle-right text-500 mx-2"></i>
      <span class="text-700">BGC board</span>
    </div>

    <!-- Header -->
    <div class="flex align-items-center justify-content-between mb-4">
      <h1 class="text-900 text-3xl font-medium m-0">Backlog</h1>
      <div class="flex gap-2">
        <Button icon="pi pi-share-alt" text />
        <Button icon="pi pi-ellipsis-h" text />
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card mb-4 p-0">
      <div class="p-3">
        <div class="flex flex-column md:flex-row gap-3">
          <!-- Search -->
          <div class="p-input-icon-left flex-auto">
            <i class="pi pi-search"></i>
            <InputText v-model="searchQuery" 
                      placeholder="Search issues" 
                      class="w-full" />
          </div>

          <!-- Avatar Group -->
          <div class="flex align-items-center gap-2">
            <div class="avatar-group flex">
              <div class="avatar bg-primary">CS</div>
              <div class="avatar bg-orange-500">CR</div>
              <div class="avatar bg-green-500">DM</div>
              <div class="avatar bg-gray-200 text-gray-900">😺</div>
              <div class="avatar bg-primary">NJ</div>
              <div class="avatar bg-gray-500">+6</div>
            </div>
            <Button icon="pi pi-user-plus" text rounded />
          </div>

          <!-- Mobile Filter Toggle -->
          <Button icon="pi pi-sliders-h" 
                  @click="showFilters = !showFilters"
                  class="md:hidden" 
                  text />
        </div>

        <!-- Filters -->
        <div :class="['filter-section mt-3', { 'hidden': !showFilters }]">
          <div class="grid">
            <div class="col-12 md:col-3">
              <Dropdown v-model="filters.version" 
                       placeholder="Version"
                       class="w-full" />
            </div>
            <div class="col-12 md:col-3">
              <Dropdown v-model="filters.epic" 
                       placeholder="Epic"
                       class="w-full" />
            </div>
            <div class="col-12 md:col-3">
              <Dropdown v-model="filters.type" 
                       placeholder="Type"
                       class="w-full" />
            </div>
            <div class="col-12 md:col-3 flex align-items-center">
              <Button label="Quick filters" 
                      icon="pi pi-filter" 
                      text 
                      class="w-full md:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sprint Section -->
    <div class="card mb-4">
      <div class="flex align-items-center justify-content-between mb-3">
        <div class="flex align-items-center gap-3">
          <i class="pi pi-angle-right"></i>
          <span class="font-medium">BGC Sprint 21</span>
          <span class="text-500">30 Oct - 12 Nov</span>
          <span class="text-500">(32 issues)</span>
        </div>
        <div class="flex align-items-center gap-2">
          <span class="bg-primary-100 text-primary-900 p-1 border-round">4h</span>
          <span class="bg-primary-100 text-primary-900 p-1 border-round">0m</span>
          <Button label="Complete sprint" severity="primary" text />
          <Button icon="pi pi-ellipsis-h" text />
        </div>
      </div>
    </div>

    <!-- Backlog Section -->
    <div class="card">
      <div class="flex align-items-center justify-content-between mb-3">
        <div class="flex align-items-center gap-3">
          <i class="pi pi-angle-down"></i>
          <span class="font-medium">Backlog</span>
          <span class="text-500">(28 issues)</span>
        </div>
        <div class="flex align-items-center gap-2">
          <span class="bg-primary-100 text-primary-900 p-1 border-round">4h</span>
          <span class="bg-primary-100 text-primary-900 p-1 border-round">0m</span>
          <Button label="Create sprint" severity="primary" text />
        </div>
      </div>

      <!-- Task List -->
      <div class="task-list">
        <div v-for="task in filteredTasks" :key="task.id" class="task-item">
          <div class="flex align-items-center gap-3">
            <i class="pi pi-check-square text-500"></i>
            <span class="font-medium">{{ task.title }}</span>
            <Tag :value="task.status" 
                 :severity="task.status === 'TODO' ? 'warning' : task.status === 'IN_PROGRESS' ? 'info' : 'success'" />
          </div>
        </div>
      </div>
    </div>

    <!-- Task Form Dialog -->
    <TaskForm v-model="showTaskForm" @save="onSaveTask" />
  </div>
</template>

<style lang="scss" scoped>
.backlog-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.avatar-group {
  display: flex;
  align-items: center;
  
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    margin-right: -0.5rem;
    border: 2px solid var(--surface-card);

    &:last-child {
      margin-right: 0;
    }
  }
}

.task-list {
  .task-item {
    padding: 1rem;
    border-bottom: 1px solid var(--surface-border);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--surface-hover);
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .backlog-container {
    padding: 1rem;
  }

  .filter-section {
    &.hidden {
      display: none;
    }
  }
}
</style>