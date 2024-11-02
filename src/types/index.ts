export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string
  startDate?: string
  dueDate?: string
  estimate?: number
  sprintId?: string
  createdAt: string
  updatedAt?: string
}