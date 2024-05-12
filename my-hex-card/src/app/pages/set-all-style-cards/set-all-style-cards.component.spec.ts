import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAllStyleCardsComponent } from './set-all-style-cards.component';

describe('SetAllStyleCardsComponent', () => {
  let component: SetAllStyleCardsComponent;
  let fixture: ComponentFixture<SetAllStyleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetAllStyleCardsComponent]
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
