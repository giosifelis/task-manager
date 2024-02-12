import { Component, EventEmitter, Input, Output } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Task } from '../tasks/task/task'
import { TaskFormComponent } from '../tasks/task-form/task-form.component'
import { TasksService } from '../tasks/tasks.service'

@Component({
  selector: 'top-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.less'
})
export class TopHeaderComponent {
  asideVisible!: Task
  constructor(private _dialog: MatDialog, private _taskService: TasksService) {}
  @Input() taskList: Array<{ value: string; display: string }> = []
  @Output() newTaskAdded: EventEmitter<any> = new EventEmitter()

  openTaskForm() {
    const dialog = this._dialog.open(TaskFormComponent, {
      data: {
        formAction: 'SAVE',
        formData: undefined,
        taskStates: this.taskList
      }
    })

    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.newTaskAdded.emit(val)
        }
      }
    })
  }
}
