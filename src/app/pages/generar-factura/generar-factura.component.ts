import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalesService } from '../../services/locales.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css'],
})
export class GenerarFacturaComponent implements OnInit {
  private token: string;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _localService: LocalesService,
    private _usService: UserService
  ) {
    this.token = this._usService.getToken;
    this.getLocaleAndClient();
  }

  ngOnInit(): void {}

  getLocaleAndClient() {
    return this._activateRoute.params.subscribe((params) => {
      this._localService
        .getLocalesById(params['id'], this.token)
        .subscribe((resp) => {
          console.log(resp);
        });
    });
  }
}
