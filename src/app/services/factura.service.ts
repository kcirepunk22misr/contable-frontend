import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private URL: string;

  constructor(private _http: HttpClient) {
    this.URL = environment.url;
  }

  generarFactura(inforFactura, token: string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${token}`);

    let body = JSON.stringify(inforFactura);

    return this._http.post(`${this.URL}/bills/`, body, { headers });
  }
}
