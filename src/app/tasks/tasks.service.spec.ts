import { TasksCrudService } from './tasks-crud.service';
import { TestBed } from '@angular/core/testing';

describe('TasksCrudService', () => {
  let service: TasksCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
