import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client, ClientsPages } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private URL: string;

  constructor(private _http: HttpClient) {
    this.URL = environment.url;
  }

  getClients(page: number, token: string): Observable<ClientsPages> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);
    return this._http.get<ClientsPages>(
      `${this.URL}/clients/?limit=2&offset=${page}`,
      {
        headers,
      }
    );
  }

  getClientById(id: string, token: string): Observable<Client> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    return this._http.get<Client>(`${this.URL}/clients/${id}/`, { headers });
  }

  createClient(client: Client, token: string): Observable<Client> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    let body = JSON.stringify(client);

    return this._http.post<Client>(`${this.URL}/clients/`, body, {
      headers,
    });
  }

  updateClient(id: string, client: Client, token: string): Observable<Client> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    let body = JSON.stringify(client);
    return this._http.put<Client>(`${this.URL}/clients/${id}/`, body, {
      headers,
    });
  }

  deleteClient(id: string, token: string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    return this._http.delete(`${this.URL}/clients/${id}/`, { headers });
  }
}
