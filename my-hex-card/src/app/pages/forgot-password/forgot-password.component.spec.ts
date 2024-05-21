import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute}, UserService, provideHttpClient() ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
