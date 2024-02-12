import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public readonly API_ENDPOINT: string = 'http://localhost:3000';

  public readonly ENTITIES = {
    TASKS: 'tasks',
    TASKSTATES: 'taskStates',
  };
}
