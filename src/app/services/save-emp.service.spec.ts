import { TestBed } from '@angular/core/testing';

import { SaveEmpService } from './save-emp.service';

describe('SaveEmpService', () => {
  let service: SaveEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
