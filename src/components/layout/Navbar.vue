<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <nav class="bg-white border-b border-jira-border h-14 px-4 flex items-center">
    <div class="flex items-center space-x-4">
      <button class="btn-secondary p-2">
        <i class="pi pi-th-large"></i>
      </button>
      <img src="/jira-logo.svg" alt="Jira" class="h-6" />
      
      <div class="hidden md:flex items-center space-x-1">
        <button class="nav-link flex items-center space-x-2">
          <i class="pi pi-user"></i>
          <span>Your work</span>
        </button>
        <button class="nav-link active flex items-center space-x-2">
          <i class="pi pi-folder"></i>
          <span>Projects</span>
        </button>
        <button class="nav-link flex items-center space-x-2">
          <i class="pi pi-filter"></i>
          <span>Filters</span>
        </button>
        <button class="nav-link flex items-center space-x-2">
          <i class="pi pi-chart-line"></i>
          <span>Dashboards</span>
        </button>
      </div>
      
      <button class="btn btn-primary flex items-center space-x-2">
        <i class="pi pi-plus"></i>
        <span>Create</span>
      </button>
    </div>

    <div class="ml-auto flex items-center space-x-4">
      <div class="relative hidden md:block">
        <i class="pi pi-search absolute left-3 top-2.5 text-jira-gray"></i>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search" 
          class="input pl-10"
        >
      </div>
      
      <button class="btn-secondary p-2 relative">
        <i class="pi pi-bell"></i>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
      </button>
      
      <button class="btn-secondary p-2">
        <i class="pi pi-question-circle"></i>
      </button>
      
      <button class="btn-secondary p-2">
        <i class="pi pi-cog"></i>
      </button>
      
      <div class="avatar bg-jira-blue">JD</div>
    </div>
  </nav>
</template>