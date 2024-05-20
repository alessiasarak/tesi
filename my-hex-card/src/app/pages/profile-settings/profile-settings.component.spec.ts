import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsComponent } from './profile-settings.component';
import { UserService } from '../../services/user/user.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProfileSettingsComponent', () => {
  let component: ProfileSettingsComponent;
  let fixture: ComponentFixture<ProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingsComponent],
      providers: [UserService, provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
