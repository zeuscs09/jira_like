<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from '../components/TaskForm.vue'
import TaskCard from '../components/TaskCard.vue'
import Button from 'primevue/button'
import type { Task } from '../types'

const taskStore = useTaskStore()
const showTaskForm = ref(false)

const onDragStart = (event: DragEvent, taskId: string) => {
  event.dataTransfer?.setData('taskId', taskId)
}

const onDrop = (event: DragEvent, status: Task['status']) => {
  const taskId = event.dataTransfer?.getData('taskId')
  if (taskId) {
    taskStore.updateTaskStatus(taskId, status)
  }
}

const onSaveTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
  taskStore.addTask(task)
}
</script>

<template>
  <div class="board-container">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="m-0">Board</h1>
      <Button label="Create Task" icon="pi pi-plus" severity="primary" raised @click="showTaskForm = true" />
    </div>

    <div class="board">
      <div class="board-column" 
           @drop="onDrop($event, 'TODO')" 
           @dragover.prevent>
        <div class="column-header">
          <h2>To Do</h2>
          <span class="task-count">{{ taskStore.tasksByStatus.todo.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard 
            v-for="task in taskStore.tasksByStatus.todo" 
            :key="task.id"
            :task="task"
            draggable="true"
            @dragstart="onDragStart($event, task.id)" />
        </div>
      </div>

      <div class="board-column" 
           @drop="onDrop($event, 'IN_PROGRESS')" 
           @dragover.prevent>
        <div class="column-header">
          <h2>In Progress</h2>
          <span class="task-count">{{ taskStore.tasksByStatus.inProgress.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard 
            v-for="task in taskStore.tasksByStatus.inProgress" 
            :key="task.id"
            :task="task"
            draggable="true"
            @dragstart="onDragStart($event, task.id)" />
        </div>
      </div>

      <div class="board-column" 
           @drop="onDrop($event, 'DONE')" 
           @dragover.prevent>
        <div class="column-header">
          <h2>Done</h2>
          <span class="task-count">{{ taskStore.tasksByStatus.done.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard 
            v-for="task in taskStore.tasksByStatus.done" 
            :key="task.id"
            :task="task"
            draggable="true"
            @dragstart="onDragStart($event, task.id)" />
        </div>
      </div>
    </div>

    <TaskForm 
      v-model="showTaskForm"
      @save="onSaveTask" />
  </div>
</template>

<style scoped>
.board-container {
  padding: 1rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.board-column {
  background: #F1F5F9;
  border-radius: 12px;
  padding: 1.25rem;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(0,0,0,0.1);
}

.column-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.task-count {
  background: rgba(0,0,0,0.1);
  color: var(--text-color);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.column-content {
  flex: 1;
  overflow-y: auto;
}

/* Column drop target styling */
.board-column.drag-over {
  background: #E2E8F0;
}
</style>