import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalesService } from '@services/locales.service';
import { UserService } from '@services/user.service';
import { Locales } from '@interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-locales',
  templateUrl: './listar-locales.component.html',
  styleUrls: ['./listar-locales.component.css'],
})
export class ListarLocalesComponent implements OnInit, OnDestroy {
  page: number = 0;
  number_pages: any[];
  prev_page: number;
  next_page: number;
  contador: any[];
  locales: Locales[] = [];
  token: string;

  constructor(
    private _localesService: LocalesService,
    private _usService: UserService,
    private toastr: ToastrService,
    private _activateRoute: ActivatedRoute
  ) {
    this.token = _usService.getToken;
  }

  ngOnInit(): void {
    this.loadQuryId();
  }

  ngOnDestroy() {
    this.loadQuryId().unsubscribe();
    this.getLocales().unsubscribe();
  }

  loadQuryId() {
    return this._activateRoute.queryParams.subscribe((queryParmas: Params) => {
      let query = Number(queryParmas['q']);

      if (!query || isNaN(query)) {
        this.page = 0;
      } else {
        this.page = query;
      }

      this.getLocales();
    });
  }

  getLocales() {
    return this._localesService
      .getLocales(this.page, this.token)
      .subscribe((resp) => {
        this.locales = [];

        this.locales.push(...resp.results);

        let number_pages = [];
        this.contador = [];
        let contador = 0;
        for (let i = 0; i < resp.count; i += 2) {
          this.contador.push(contador++);
          number_pages.push(i);
        }
        this.number_pages = number_pages;
        if (this.page >= 2) {
          this.prev_page = this.page - 2;
        } else {
          this.prev_page = 0;
        }

        if (this.page < resp.count - 2) {
          this.next_page = this.page + 2;
        } else {
          this.next_page = resp.count - 2;
        }
      });
  }

  deleteLocal(id: string, name: string) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este Local?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.value) {
        return this._localesService
          .deleteLocal(id, this.token)
          .subscribe(() => {
            this.getLocales();
            this.toastr.success('Borrado!!', `${name} eliminado correctamente`);
          });
      }
    });
  }

  generarFactura(locale: Locales) {
    console.log(locale);
  }

  trackByFn(index, local: Locales): number {
    return local.id;
  }
}
