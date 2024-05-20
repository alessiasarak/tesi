import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAllStyleCardsComponent } from './set-all-style-cards.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('SetAllStyleCardsComponent', () => {
  let component: SetAllStyleCardsComponent;
  let fixture: ComponentFixture<SetAllStyleCardsComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ id: 1 });
    
    await TestBed.configureTestingModule({
      imports: [SetAllStyleCardsComponent],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetAllStyleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
