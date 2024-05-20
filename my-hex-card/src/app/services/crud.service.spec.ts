import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { User } from '../interfaces/user';

describe('CrudService', () => {
  let service: CrudService<User>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
