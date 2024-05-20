import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardsComponent } from './user-cards.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('UserCardsComponent', () => {
  let component: UserCardsComponent;
  let fixture: ComponentFixture<UserCardsComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ idContact: 1 });
    
    await TestBed.configureTestingModule({
      imports: [UserCardsComponent],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
