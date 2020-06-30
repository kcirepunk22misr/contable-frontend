import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './SignInSignUp/login/login.component';
import { Notfound404Component } from './notfound404/notfound404.component';
import { RegisterComponent } from './SignInSignUp/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', component: Notfound404Component },
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: true });
