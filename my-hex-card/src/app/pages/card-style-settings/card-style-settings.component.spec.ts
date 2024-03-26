import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStyleSettingsComponent } from './card-style-settings.component';

describe('CardStyleSettingsComponent', () => {
  let component: CardStyleSettingsComponent;
  let fixture: ComponentFixture<CardStyleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStyleSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardStyleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
