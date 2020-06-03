import { TestBed } from '@angular/core/testing';

import { TodoRouteGuardService } from './todo-route-guard.service';

describe('TodoRouteGuardService', () => {
  let service: TodoRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
