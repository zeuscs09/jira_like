<script setup lang="ts">
import { ref } from 'vue';
import { useLayout } from './composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, layoutState, toggleMenu } = useLayout();
const router = useRouter();

const searchQuery = ref('');
</script>

<template>
  <div class="layout-topbar">
    <div class="topbar-start">
      <button class="menu-button" @click="toggleMenu($event)">
        <i class="pi pi-bars"></i>
      </button>
      
      <img src="/jira-logo.svg" alt="Jira" class="logo" />
      
      <div class="nav-items">
        <Button label="Your work" icon="pi pi-user" text />
        <Button label="Projects" icon="pi pi-folder" text class="active" />
        <Button label="Filters" icon="pi pi-filter" text />
        <Button label="Dashboards" icon="pi pi-chart-line" text />
      </div>
      
      <Button label="Create" icon="pi pi-plus" severity="primary" />
    </div>

    <div class="topbar-end">
      <span class="p-input-icon-left search-input">
        <i class="pi pi-search"></i>
        <InputText v-model="searchQuery" placeholder="Search" />
      </span>
      
      <Button icon="pi pi-bell" text badge="2" badge-severity="danger" />
      <Button icon="pi pi-question-circle" text />
      <Button icon="pi pi-cog" text />
      
      <Avatar label="JD" shape="circle" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-topbar {
  height: 56px;
  padding: 0 1rem;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .topbar-start {
    display: flex;
    align-items: center;
    gap: 1rem;

    .logo {
      height: 24px;
    }

    .nav-items {
      display: flex;
      gap: 0.5rem;

      :deep(.p-button) {
        &.active {
          background: var(--primary-50);
          color: var(--primary-color);
        }
      }
    }
  }

  .topbar-end {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .search-input {
      :deep(.p-inputtext) {
        width: 240px;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .layout-topbar {
    .nav-items, .search-input {
      display: none;
    }
  }
}
</style>