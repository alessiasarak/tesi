import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ContactService } from '../../services/contact/contact.service';
import { provideHttpClient } from '@angular/common/http';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ id: 1 });
    
    await TestBed.configureTestingModule({
      imports: [AddUserComponent],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute}, ContactService, provideHttpClient() ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
