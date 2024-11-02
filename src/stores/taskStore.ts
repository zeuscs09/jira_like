import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskStatus } from '../types'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))

  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString()
    }
    tasks.value.push(newTask)
    saveToLocalStorage()
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status })
  }

  const deleteTask = (taskId: string) => {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
    saveToLocalStorage()
  }

  const tasksByStatus = computed(() => {
    return {
      todo: tasks.value.filter(t => t.status === 'TODO'),
      inProgress: tasks.value.filter(t => t.status === 'IN_PROGRESS'),
      done: tasks.value.filter(t => t.status === 'DONE')
    }
  })

  return {
    tasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    tasksByStatus
  }
})