import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalesService } from '@services/locales.service';
import { UserService } from '@services/user.service';
import { Client } from '@interfaces/interfaces';
import { Locales } from '@interfaces/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FacturaService } from '@services/factura.service';
import * as moment from 'moment';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css'],
})
export class GenerarFacturaComponent implements OnInit {
  private token: string;
  forma: FormGroup;
  client: Client[] = [];
  local: Locales[] = [];
  dataFactura: Locales;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _localService: LocalesService,
    private _usService: UserService,
    private _facturaService: FacturaService,
    private fb: FormBuilder
  ) {
    this.token = this._usService.getToken;
    this.getLocaleAndClient();
    this.createForm();
  }

  ngOnInit(): void {
    console.log(new Date(moment().format('YYYY-MM-DD')));
  }

  createForm() {
    this.forma = this.fb.group({
      administration_price: [''],
      water_service_price: [''],
      energy_service_price: [''],
    });
  }

  getLocaleAndClient() {
    return this._activateRoute.params.subscribe((params) => {
      this._localService
        .getLocalesById(params['id'], this.token)
        .subscribe((resp) => {
          // console.log(resp.client);
          this.dataFactura = resp;
          // this.client = resp.client;

          this.client.push({ ...resp.client });
          this.local.push({ ...resp });
        });
    });
  }

  save() {
    let {
      client: { name: client_name, nit_number, phone_number, city, address },
      name: place_name,
      location,
      price,
      vat,
      observation,
    } = this.dataFactura;

    let body = {
      ...this.forma.value,
      client_name,
      client_nit: nit_number,
      phone: phone_number,
      city,
      address,
      place_name,
      place_price: price,
      vat,
      way_to_pay: 'efectivo',
      facture_date: moment().format('YYYY-MM-DD'),
    };

    this._facturaService.generarFactura(body, this.token).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => console.log(err)
    );
  }

  public getServicioCOP(name: string): number {
    return this.forma.get(name).value;
  }
}
