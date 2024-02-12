export interface Task {
  id: string
  name: string
  state: string
  estimate: number
  description: string
}

export type TaskAction = 'DELETE' | 'EDIT'
export type TaskFormAction = 'SAVE' | 'UPDATE'

export interface TaskPayload {
  actionType: TaskAction
  data: Task
}
