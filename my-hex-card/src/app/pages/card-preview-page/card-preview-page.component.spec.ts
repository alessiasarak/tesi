import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewPageComponent } from './card-preview-page.component';

describe('CardPreviewPageComponent', () => {
  let component: CardPreviewPageComponent;
  let fixture: ComponentFixture<CardPreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
