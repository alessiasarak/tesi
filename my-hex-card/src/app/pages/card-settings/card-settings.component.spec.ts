import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSettingsComponent } from './card-settings.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CardSettingsComponent', () => {
  let component: CardSettingsComponent;
  let fixture: ComponentFixture<CardSettingsComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {}
      }
    } as ActivatedRoute;
    fakeActivatedRoute.params = of({ id: 1 });

    await TestBed.configureTestingModule({
      imports: [CardSettingsComponent],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute}, CardService, provideHttpClient() ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
