import { Component, Input } from '@angular/core'
import { Task, TaskPayload } from '../task/task'

import { ChartsComponent } from '../charts/charts.component'
import { EstimateCounterComponent } from '../estimate-counter/estimate-counter.component'
import { LoggerService } from '../../coreServices/logger/logger.service'
import { MatDialog } from '@angular/material/dialog'
import { NgIf } from '@angular/common'
import { TaskFormComponent } from '../task-form/task-form.component'
import { TaskListComponent } from '../task-list/task-list.component'
import { TasksService } from '../tasks.service'
import { TopHeaderComponent } from '../../top-header/top-header.component'

@Component({
  selector: 'tasks-container',
  standalone: true,
  imports: [
    TaskListComponent,
    TopHeaderComponent,
    EstimateCounterComponent,
    ChartsComponent,
    NgIf
  ],
  templateUrl: './tasks-container.component.html',
  styleUrl: './tasks-container.component.less'
})
export class TasksContainerComponent {
  plannedTasks: Array<Task> = []
  inProgressTasks: Array<Task> = []
  completedTasks: Array<Task> = []

  chartCounts: Array<number> = []
  chartLabels: Array<string> = []

  estimateCounts = {
    planned: 0,
    inProgress: 0,
    completed: 0
  }
  chartData = {
    loaded: false,
    counts: this.chartCounts,
    labels: this.chartLabels
  }

  serverData: Array<Task> = []

  constructor(
    private _taskService: TasksService,
    private _logger: LoggerService,
    private _dialog: MatDialog
  ) {
    this.getTasks()
    // this.getNewAddedTask()
  }

  @Input() taskList: Array<{ value: string; display: string }> = []

  private calcTotalEstimates(array: Array<Task>) {
    return array.reduce((acc, total) => {
      return acc + total.estimate
    }, 0)
  }

  private filterByState(array: Array<Task>) {
    const planned = array.filter((f) => f.state === 'PLANNED')
    const inProgress = array.filter((f) => f.state === 'IN_PROGRESS')
    const completed = array.filter((f) => f.state === 'COMPLETED')

    this.plannedTasks = planned
    this.inProgressTasks = inProgress
    this.completedTasks = completed

    this.estimateCounts = {
      planned: this.calcTotalEstimates(planned),
      inProgress: this.calcTotalEstimates(inProgress),
      completed: this.calcTotalEstimates(completed)
    }

    this.chartData = {
      loaded: true,
      counts: [planned.length, inProgress.length, completed.length],
      labels: [...this.taskList.map((m) => m.display)]
    }
  }

  private handleDelete(t: Task) {
    this._taskService.deleteTask(t.id).subscribe({
      next: (res) => {
        alert('task deleted')
        this.serverData = this.serverData.filter((f) => f.id !== t.id)
        this.filterByState(this.serverData)
      },
      error: (err) => {
        this._logger.error(err)
      }
    })
  }

  private handleEdit(task: Task) {
    const dialog = this._dialog.open(TaskFormComponent, {
      data: {
        formAction: 'UPDATE',
        formData: task,
        taskStates: this.taskList
      }
    })

    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.handleTaskUpdated(val)
        }
      }
    })
  }

  handleTaskAction(payload: TaskPayload) {
    const { actionType, data } = payload
    switch (actionType) {
      case 'EDIT':
        this.handleEdit(data)
        break
      case 'DELETE':
        this.handleDelete(data)
        break
    }
  }

  getTasks() {
    this._taskService.getTasks().subscribe({
      next: (res) => {
        this.serverData = res
        this.filterByState(this.serverData)
      },
      error: (err) => {
        this._logger.error(err)
      }
    })
  }

  private handleTaskUpdated(payload: any) {
    const { id, task } = payload

    this.serverData = this.serverData.map((m) => {
      return m.id === id
        ? {
            ...m,
            ...task
          }
        : { ...m }
    })

    this.filterByState(this.serverData)
  }
  handleNewTaskAdded(payload: Task) {
    this.serverData = [...this.serverData, payload]
    this.filterByState(this.serverData)
  }
}
