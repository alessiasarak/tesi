import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ token: "sjdlkajsdkjkjKJ" });
    
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
