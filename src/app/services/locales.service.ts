import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Locales, LocalesPages } from '@interfaces/interfaces';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalesService {
  private URL: string;

  constructor(private _http: HttpClient) {
    this.URL = environment.url;
  }

  getLocales(page: number, token: string): Observable<LocalesPages> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    return this._http.get<LocalesPages>(`${this.URL}/places/?limit=2&offset=${page}`, { headers });
  }

  getLocalesById(id: string, token: string): Observable<Locales> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Token ${token}`);

    return this._http.get<Locales>(`${this.URL}/places/${id}/`, { headers });
  }

  saveLocal(local: Locales, token: string): Observable<Locales> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    let body = JSON.stringify(local);

    return this._http.post<Locales>(`${this.URL}/places/`, body, { headers });
  }

  updateLocal(id: string, local: Locales, token: string): Observable<Locales> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    let body = JSON.stringify(local);
    return this._http.put<Locales>(`${this.URL}/places/${id}/`, body, {
      headers,
    });
  }


  deleteLocal(id: string, token: string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    return this._http.delete(`${this.URL}/places/${id}/`, { headers });
  }

}
