import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MainComponent } from './pages/main/main.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { Error404Component } from './error/error-404/error-404.component';
import { CardSettingsComponent } from './pages/card-settings/card-settings.component';
import { CardStyleSettingsComponent } from './pages/card-style-settings/card-style-settings.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', providers: [provideHttpClient()], component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },

    { path: 'settings', component: SettingsComponent },
    { path: 'profile-settings', component: ProfileSettingsComponent },
    { path: 'card-settings', component: CardSettingsComponent },
    { path: 'card-style-settings', component: CardStyleSettingsComponent },
    
    { path: '**', component: Error404Component },
];
