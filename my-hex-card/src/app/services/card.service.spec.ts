import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CardService } from './card.service';
import { lastValueFrom } from 'rxjs';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService]
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*
  it('should get a card by ID', () => {
    const idCard = '123';
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };

    service.getCard(idCard).subscribe(card => {
      expect(card).toEqual(mockCard);
    });

    const req = httpMock.expectOne('/card/' + idCard);
    expect(req.request.method).toBe('GET');
    req.flush(mockCard);
  });

  it('should get a user card', () => {
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };
    spyOn(sessionStorage, 'getItem').and.returnValue('user_id');

    service.getAUserCard().subscribe(card => {
      expect(card).toEqual(mockCard);
    });

    const req = httpMock.expectOne('/card/a-card/user_id');
    expect(req.request.method).toBe('GET');
    req.flush(mockCard);
  });

  it('should get cards by contact', async () => {
    const idContact = '456';
    const mockCards = [{
      id: 123,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    }, {
      id: 456,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    }];

    const cards = await service.getCardsByContact(idContact);
    expect(cards).toEqual(mockCards);

    const req = httpMock.expectOne('/card/contact/' + idContact);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should get cards by user', async () => {
    const idUser = '789';
    const mockCards = [{
      id: 123,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    },{
      id: 456,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    }];

    const cards = await service.getCardsByUser(idUser);
    expect(cards).toEqual(mockCards);

    const req = httpMock.expectOne('/card/user/' + idUser);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should put a card', async () => {
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };
    spyOn(sessionStorage, 'getItem').and.returnValue('user_id');
    const token = 'token';

    const updatedCard = await service.putCard(mockCard, token);
    expect(updatedCard).toEqual(mockCard);

    const req = httpMock.expectOne('/card/update/user_id/token');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });

  it('should put a style card', async () => {
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };
    spyOn(sessionStorage, 'getItem').and.returnValue('user_id');
    const token = 'token';

    const updatedCard = await service.putStyleCard(mockCard, token);
    expect(updatedCard).toEqual(mockCard);

    const req = httpMock.expectOne('/card/update/style/user_id/token');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });

  it('should put a style for all cards', async () => {
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };
    spyOn(sessionStorage, 'getItem').and.returnValue('user_id');

    const updatedCard = await service.putStyleAllCard(mockCard);
    expect(updatedCard).toEqual(mockCard);

    const req = httpMock.expectOne('/card/all-style/user_id');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCard);
    req.flush(mockCard);
  });

  it('should post a card', async () => {
    const idContact = '456';
    const mockCard = {
      id: 0,
      img: '',
      name: '',
      surname: '',
      company: '',
      function: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      whatsapp: '',
      youtube: '',
      token: '',
      active: false,
      fk_id_user: 0,
      fk_id_contact: 0,
      email: [],
      phone_number: [],
      link: [],
      address: [],
      background_color: '',
      text_color: '',
      button_color: ''
    };

    const createdCard = await service.postCard(idContact);
    expect(createdCard).toEqual(mockCard);

    const req = httpMock.expectOne('/card/' + idContact);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeUndefined();
    req.flush(mockCard);
  });*/
});
