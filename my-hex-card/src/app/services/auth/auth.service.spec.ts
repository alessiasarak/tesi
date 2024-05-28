import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const user = { 
    id:0,
    email: 'teste@mailch',
    password: "testpassword",

    reset_password_token: "",
    fk_role: { role: "USER" }
  };
  const expectedResponse = { 
    id:0,
    email: 'teste@mailch',
    password: "testpassword",

    reset_password_token: "",
    fk_role: { role: "USER" }
  };
  const token = 'testtoken';

  
  it('should register with token', async () => {
    service.register(user, token).then((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3124/auth/register/'+token);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should login without token', async () => {
    service.login(user, undefined).then((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3124/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should login with token', async () => {
    service.login(user, token).then((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3124/auth/login/'+token);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should check if user is authenticated', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('1');

    const isAuthenticated = service.isAuthenticated();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('user_id');
    expect(isAuthenticated).toBe(true);
  });

  it('should check if user is admin', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('ADMIN');

    const isAdmin = service.isAdmin();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('role');
    expect(isAdmin).toBe(true);
  });

  it('should logout', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(service, 'get');

    service.logout();

    expect(sessionStorage.setItem).toHaveBeenCalledWith('user_id', '');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('role', '');
    expect(service.get).toHaveBeenCalledWith('/logout');
  });
});
