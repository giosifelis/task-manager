import { ApiServiceService } from '../coreServices/apiService/api-service.service'
import { ConstantsService } from '../config/constants/constants.service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private _apiService: ApiServiceService,
    private _constants: ConstantsService
  ) {}

  TASKS = this._constants.ENTITIES.TASKS
  TASKSTATES = this._constants.ENTITIES.TASKSTATES

  getTasks(): Observable<any> {
    return this._apiService.GET(this.TASKS)
  }

  addTask(data: any): Observable<any> {
    return this._apiService.POST(this.TASKS, data)
  }
  updateTask(id: any, data: any) {
    return this._apiService.PUT(this.TASKS, id, data)
  }

  deleteTask(id: any): Observable<any> {
    return this._apiService.DELETE(this.TASKS, id)
  }

  getStates(): Observable<any> {
    return this._apiService.GET(this.TASKSTATES)
  }
}
