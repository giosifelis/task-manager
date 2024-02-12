import { Component } from '@angular/core';
import { LoggerService } from './coreServices/logger/logger.service';
import { TasksContainerComponent } from './tasks/tasks-container/tasks-container.component';
import { TasksService } from './tasks/tasks.service';
import { TopHeaderComponent } from './top-header/top-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopHeaderComponent, TasksContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'task-manager';

  taskStates: Array<{ value: string; display: string }> = [];

  constructor(
    private _taskCrudService: TasksService,
    private _logger: LoggerService
  ) {
    this.getTaskStates();
  }

  getTaskStates() {
    this._taskCrudService.getStates().subscribe({
      next: (res) => {
        this.taskStates = res;
      },
      error: (err) => {
        this._logger.error(err);
      },
    });
  }
}
