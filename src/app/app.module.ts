// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routes';
import { PagesModule } from './pages/pages.module';

// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './SignInSignUp/login/login.component';
import { Notfound404Component } from './notfound404/notfound404.component';
import { RegisterComponent } from './SignInSignUp/register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, Notfound404Component, RegisterComponent],
  imports: [BrowserModule, AppRouting, PagesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
