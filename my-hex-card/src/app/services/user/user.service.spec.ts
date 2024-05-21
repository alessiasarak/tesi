import { UserService } from './user.service';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const user = { 
    id:1,
    email: 'teste@mailch',
    password: "testpassword",

    reset_password_token: "",
    fk_role: { role: "USER" }
  };
  const expectedResponse = { 
    id:1,
    email: 'teste@mailch',
    password: "testpassword",

    reset_password_token: "",
    fk_role: { role: "USER" }
  };
  const token = 'testtoken';


  it('should get user', () => {
    const userId = '1';
    localStorage.setItem('user_id', userId);

    service.getUser().subscribe(response => {
      expect(response).toEqual(user);
    });
    const req = httpMock.expectOne(`http://127.0.0.1:3124/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should update user', async () => {
    const userId = '1';

    const updatedUser = { 
      id: 1,
      email: 'updated@mail.com',
      password: 'updatedpassword',
      reset_password_token: '',
      fk_role: { role: 'USER' }
    };

    service.putUser(updatedUser).then(response => {
      expect(response).toEqual(user);
    });
    const req = httpMock.expectOne(`http://127.0.0.1:3124/user/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });
  
  it('should update password', async () => {
    const userId = '1';

    spyOn(localStorage, 'getItem').and.returnValue(userId);

    service.putPassword(user).then(response => {
      expect(response).toEqual(user);
    });
    const req = httpMock.expectOne(`http://127.0.0.1:3124/user/password/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('should update password to reset', async () => {
    service.putPasswordToReset(user, token).then(response => {
      expect(response).toEqual(user);
    });
    const req = httpMock.expectOne(`http://127.0.0.1:3124/user/reset/${token}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('should send email to reset password', async () => {
    service.sendEmailToResetPassword(user).then(response => {
      expect(response).toEqual(user);
    });
    const req = httpMock.expectOne(`http://127.0.0.1:3124/user/reset`);
    expect(req.request.method).toBe('POST');
    req.flush(user);
  });
});
