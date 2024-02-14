import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'

import { Component, Inject, OnInit } from '@angular/core'
import { LoggerService } from '../../coreServices/logger/logger.service'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { NgFor } from '@angular/common'
import { TasksService } from '../tasks.service'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.less'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup
  taskStates: Array<{ value: string; display: string }> = []

  constructor(
    private _formBuilder: FormBuilder,
    private _taskService: TasksService,
    private _logger: LoggerService,
    private _dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createTaskForm()
  }

  ngOnInit(): void {
    this.taskStates = this.data.taskStates
    this.taskForm.patchValue(this.data.formData)
  }

  createTaskForm() {
    this.taskForm = this._formBuilder.group({
      name: '',
      state: '',
      estimate: 0,
      description: ''
    })
  }

  private handleSaveTask(task: any) {
    console.log('ddd::', task)
    this._taskService.addTask(task).subscribe({
      next: (val: any) => {
        alert('Task Added success')
        this._dialogRef.close(task)
      },
      error: (err: any) => {
        this._logger.error(err)
      }
    })
  }

  private handleUpdateTask(id: any, task: any) {
    this._taskService.updateTask(id, task).subscribe({
      next: (val: any) => {
        alert('Task Updated success')
        this._dialogRef.close({
          task,
          id
        })
      },
      error: (err: any) => {
        this._logger.error(err)
      }
    })
  }

  private inputValidation(value: string) {
    return value === ''
  }

  onSubmitForm() {
    if (this.taskForm.valid) {
      switch (this.data.formAction) {
        case 'SAVE':
          this.handleSaveTask(this.taskForm.value)
          break
        case 'UPDATE':
          this.handleUpdateTask(this.data.formData.id, this.taskForm.value)
          break
      }
    }
  }
}
