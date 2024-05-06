import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MainComponent } from './pages/main/main.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { Error404Component } from './error/error-404/error-404.component';
import { CardSettingsComponent } from './pages/card-settings/card-settings.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './auth-guard';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AdminAuthGuard } from './admin-auth-guard';
import { RedirectGuard } from './redirect-guard';

export const routes: Routes = [
    { path: '', canActivate: [RedirectGuard], component: RedirectGuard, data: { externalUrl: 'https://hexcard.ch/' } },
    { path: 'card/:idCard', providers: [provideHttpClient()], component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },

    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
    { path: 'card-settings', component: CardSettingsComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    
    { path: '**', component: Error404Component },
];
