import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a contact', async () => {
    let contact = { 
      id: 0,
      name: 'Test',
      surname: 'Test',
      company: 'Test',
      email: 'test@test.ch'
     };
    const expectedResponse = { 
      id: 6,
      name: 'Test',
      surname: 'Test',
      company: 'Test',
      email: 'test@test.ch'
    };


    service.create(contact).then((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3124/auth/create');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should get all contacts', () => {
    const expectedContacts = [
      { 
        id: 6,
        name: 'Test',
        surname: 'Test',
        company: 'Test',
        email: 'test@test.ch'
      },
      { 
        id: 1,
        name: 'Alessia',
        surname: 'Sarak',
        company: 'HexagonSwiss',
        email: 'prova@gmail.com'
      },
      { 
        id: 2,
        name: 'Alessia',
        surname: 'Sarak',
        company: 'HexagonSwiss',
        email: 'alessia.sarak@sunrise.ch'
      },
      { 
        id: 5,
        name: '',
        surname: '',
        company: '',
        email: 'asdfghj'
      }
    ];

    service.getAllContacts().subscribe((contacts) => {
      expect(contacts).toEqual(expectedContacts);
    });

    const req = httpMock.expectOne('http://localhost:3124/contact');
    expect(req.request.method).toBe('GET');
    req.flush(expectedContacts);
  });

  it('should delete a contact', () => {
    const contactId = 6;

    service.deleteContact(contactId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3124/contact/${contactId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});