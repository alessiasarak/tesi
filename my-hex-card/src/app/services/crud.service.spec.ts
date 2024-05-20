import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { User } from '../interfaces/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CrudService', () => {
  let service: CrudService<User>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ { provide: 'endpoint', useValue: '/user' } ]
    });
    service = TestBed.inject(CrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
