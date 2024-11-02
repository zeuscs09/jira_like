<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import type { Task, TaskPriority } from '../types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'save': [task: Omit<Task, 'id' | 'createdAt'>]
}>()

const title = ref('')
const description = ref('')
const priority = ref<TaskPriority>('MEDIUM')
const assignee = ref('')
const startDate = ref<Date | null>(null)
const dueDate = ref<Date | null>(null)

const priorities = [
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' }
]

const teamMembers = [
  { label: 'John Doe', value: 'john.doe' },
  { label: 'Jane Smith', value: 'jane.smith' },
  { label: 'Bob Johnson', value: 'bob.johnson' }
]

const onSave = () => {
  emit('save', {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: 'TODO',
    assignee: assignee.value,
    startDate: startDate.value?.toISOString(),
    dueDate: dueDate.value?.toISOString()
  })
  resetForm()
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  priority.value = 'MEDIUM'
  assignee.value = ''
  startDate.value = null
  dueDate.value = null
  emit('update:modelValue', false)
}
</script>

<template>
  <Dialog 
    :visible="modelValue" 
    modal 
    header="Create New Task" 
    :style="{ width: '500px' }"
    @update:visible="(value) => emit('update:modelValue', value)">
    <div class="flex flex-column gap-3">
      <div class="field">
        <label for="title" class="block mb-2">Title</label>
        <InputText id="title" v-model="title" class="w-full" />
      </div>
      <div class="field">
        <label for="description" class="block mb-2">Description</label>
        <Textarea id="description" v-model="description" rows="3" class="w-full" />
      </div>
      <div class="grid">
        <div class="col-6">
          <div class="field">
            <label for="priority" class="block mb-2">Priority</label>
            <Dropdown id="priority" v-model="priority" :options="priorities" 
                     optionLabel="label" optionValue="value" class="w-full" />
          </div>
        </div>
        <div class="col-6">
          <div class="field">
            <label for="assignee" class="block mb-2">Assignee</label>
            <Dropdown id="assignee" v-model="assignee" :options="teamMembers" 
                     optionLabel="label" optionValue="value" class="w-full" />
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <div class="field">
            <label for="startDate" class="block mb-2">Start Date</label>
            <Calendar id="startDate" v-model="startDate" dateFormat="yy-mm-dd" 
                     :showIcon="true" class="w-full" />
          </div>
        </div>
        <div class="col-6">
          <div class="field">
            <label for="dueDate" class="block mb-2">Due Date</label>
            <Calendar id="dueDate" v-model="dueDate" dateFormat="yy-mm-dd" 
                     :showIcon="true" class="w-full" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="resetForm" text />
      <Button label="Save" icon="pi pi-check" @click="onSave" autofocus />
    </template>
  </Dialog>
</template>