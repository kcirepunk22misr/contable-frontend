import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login, Token } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL: string;
  private token: string;

  constructor(private _http: HttpClient) {
    this.URL = environment.url;
    this.loadToken();
  }

  loadToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  get getToken() {
    return this.token;
  }

  login(user: Login): Observable<Token> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let body = JSON.stringify(user);

    return this._http
      .post<Token>(`${this.URL}/login/`, body, { headers })
      .pipe(
        map((resp) => {
          this.saveToken(resp.token);
          return resp;
        })
      );
  }
}
