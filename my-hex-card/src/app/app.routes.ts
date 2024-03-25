import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { Error404Component } from './error/error-404/error-404.component';
import { CardSettingsComponent } from './card-settings/card-settings.component';
import { CardStyleSettingsComponent } from './card-style-settings/card-style-settings.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },

    { path: 'settings', component: SettingsComponent },
    { path: 'profile-settings', component: ProfileSettingsComponent },
    { path: 'card-settings', component: CardSettingsComponent },
    { path: 'card-style-settings', component: CardStyleSettingsComponent },
    
    { path: '**', component: Error404Component },
];
