// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './SignInSignUp/login/login.component';
import { Notfound404Component } from './notfound404/notfound404.component';
import { RegisterComponent } from './SignInSignUp/register/register.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { FormLocaleComponent } from './components/form-locale/form-locale.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Notfound404Component,
    RegisterComponent,
    FormClientComponent,
    FormLocaleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    PagesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
