import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { UserService } from '../../services/user.service';
import { Client } from '@interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent implements OnInit, OnDestroy {
  page: number = 0;
  number_pages: any[];
  prev_page: number;
  next_page: number;
  contador: any[];
  clients: Client[] = [];
  private token;

  constructor(
    private _activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _clientService: ClientsService,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken;
  }

  ngOnInit(): void {
    this.loadQuryId();
  }

  ngOnDestroy() {
    this.getClients().unsubscribe();
    this.loadQuryId().unsubscribe();
  }

  loadQuryId() {
    return this._activateRoute.queryParams.subscribe((queryParmas: Params) => {
      let query = Number(queryParmas['q']);

      if (!query || isNaN(query)) {
        this.page = 0;
      } else {
        this.page = query;
      }

      this.getClients();
    });
  }

  getClients() {
    return this._clientService
      .getClients(this.page, this.token)
      .subscribe((resp) => {
        this.clients = [];
        this.clients.push(...resp.results);

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

  deleteClient(id: string, name: string) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.value) {
        return this._clientService
          .deleteClient(id, this.token)
          .subscribe(() => {
            this.getClients();
            this.toastr.success('Borrado!!', `${name} eliminado correctamente`);
          });
      }
    });
  }

  trackByFn(index, client: Client): number {
    return client.id;
  }
}
