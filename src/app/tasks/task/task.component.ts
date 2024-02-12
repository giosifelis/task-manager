import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, TaskAction } from './task'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'task',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent {
  @Input() task!: Task
  @Output() primaryAction: EventEmitter<any> = new EventEmitter()

  handleAction(action: TaskAction) {
    this.primaryAction.emit({
      actionType: action,
      data: this.task
    })
  }
}
