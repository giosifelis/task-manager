import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Task, TaskPayload } from '../task/task'

import { EmptyStateComponent } from '../../empty-state/empty-state.component'
import { EstimateCounterComponent } from '../estimate-counter/estimate-counter.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { NgIf } from '@angular/common'
import { TaskComponent } from '../task/task.component'

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    EmptyStateComponent,
    EstimateCounterComponent,
    TaskComponent,
    NgIf,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.less'
})
export class TaskListComponent {
  @Input() title!: string
  @Input() tasklist!: Array<Task>
  @Input() estimatecount!: number
  @Output() taskAction: EventEmitter<any> = new EventEmitter()

  taskPrimaryAction(payload: TaskPayload) {
    this.taskAction.emit(payload)
  }
}
