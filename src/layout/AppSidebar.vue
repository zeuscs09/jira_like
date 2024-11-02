<script setup lang="ts">
import { ref } from 'vue'
import { useLayout } from './composables/layout'

const { layoutConfig, onMenuToggle } = useLayout()

const filters = ref([
  { label: 'All issues', icon: 'pi pi-list' },
  { label: 'My open issues', icon: 'pi pi-user', active: true },
  { label: 'Reported by me', icon: 'pi pi-send' },
  { label: 'Open issues', icon: 'pi pi-folder-open' },
  { label: 'Done issues', icon: 'pi pi-check-circle' },
  { label: 'Viewed recently', icon: 'pi pi-eye' },
  { label: 'Resolved recently', icon: 'pi pi-check' },
  { label: 'Updated recently', icon: 'pi pi-refresh' }
])
</script>

<template>
  <div class="layout-sidebar">
    <div class="project-info">
      <div class="project-avatar">
        <span>AE</span>
      </div>
      <div class="project-details">
        <h2>ASW e-Contract</h2>
        <p>Software project</p>
      </div>
    </div>
    
    <Button icon="pi pi-arrow-left" 
            label="Back to project" 
            text 
            class="back-button" />
    
    <div class="filter-section">
      <h3>Default Filters</h3>
      <ul class="filter-list">
        <li v-for="filter in filters" 
            :key="filter.label" 
            :class="{ active: filter.active }">
          <Button :icon="filter.icon" 
                  :label="filter.label" 
                  text 
                  class="w-full justify-content-start" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-sidebar {
  position: fixed;
  width: 240px;
  height: calc(100vh - 56px);
  top: 56px;
  left: 0;
  background: var(--surface-card);
  border-right: 1px solid var(--surface-border);
  padding: 1rem 0;
  overflow-y: auto;

  .project-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;

    .project-avatar {
      width: 32px;
      height: 32px;
      background: var(--primary-color);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      font-size: 0.857rem;
    }

    .project-details {
      h2 {
        font-size: 0.857rem;
        font-weight: 500;
        margin: 0;
        color: var(--text-color);
      }

      p {
        font-size: 0.857rem;
        color: var(--text-color-secondary);
        margin: 0;
      }
    }
  }

  .back-button {
    width: 100%;
    justify-content: flex-start;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    
    :deep(.p-button-label) {
      font-weight: 400;
    }
  }

  .filter-section {
    h3 {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-color-secondary);
      margin: 1rem 1rem 0.5rem;
      padding: 0;
    }
  }

  .filter-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      :deep(.p-button) {
        padding: 0.5rem 1rem;
        font-weight: 400;
        color: var(--text-color);
        
        .p-button-icon {
          color: var(--text-color-secondary);
        }
      }

      &.active {
        background: var(--primary-50);
        
        :deep(.p-button) {
          color: var(--primary-color);
          
          .p-button-icon {
            color: var(--primary-color);
          }
        }
      }

      &:hover:not(.active) {
        background: var(--surface-hover);
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .layout-sidebar {
    transform: translateX(-100%);
    transition: transform 0.2s;

    &.active {
      transform: translateX(0);
    }
  }
}
</style>