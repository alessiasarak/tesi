import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordResetComponent } from './forgot-password-reset.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { of } from 'rxjs';

describe('ForgotPasswordResetComponent', () => {
  let component: ForgotPasswordResetComponent;
  let fixture: ComponentFixture<ForgotPasswordResetComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ token: "testoken" });
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordResetComponent],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute}, UserService, provideHttpClient() ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
