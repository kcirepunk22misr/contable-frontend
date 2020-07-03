import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalesService } from '@services/locales.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
})
export class LocalesComponent implements OnInit {
  forma: FormGroup;
  token: string;
  id: string;
  error: any;

  constructor(
    private fb: FormBuilder,
    private _localesService: LocalesService,
    private _usService: UserService,
    private _activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.token = this._usService.getToken;
    this.loadId();
    this.createForm();
    if (this.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    if (this.error) {
      console.log('Existe')
    } else {
      console.log('No Existe')
    }
  }

  createForm() {
    this.forma = this.fb.group({
      client: [null],
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      vat: ['', [Validators.required, Validators.maxLength(2)]],
      observation: ['', Validators.required],
    });
  }

  getValidadeFormName(name: string): boolean {
    return (
      this.forma.get(name)?.invalid &&
      (this.forma.get(name).touched || this.forma.get(name).dirty)
    );
  }

  save() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) =>
        control.markAsTouched()
      );
    }

    if (this.forma.valid) {
      return this._localesService
        .saveLocal(this.forma.value, this.token)
        .subscribe(
          (resp) => {
            this.forma.reset();
            this.toastr.success(
              `Nuevo Local ${resp.name}`,
              'Guardado Exitoxamente!!'
            );
          },
          (err) => {
            console.log(err);
            if (err.error.detail) {
              this.toastr.error(
                'Verifica tus credenciales',
                'Permiso Denegado'
              );
            }
          }
        );
    }
  }

    // UPDATE LOCALES
    update() {
      let local = {
        ...this.forma.value,
      };

      return this._localesService
        .updateLocal(this.id, local, this.token)
        .subscribe((resp) => {
          this.toastr.success(
            'Local Actualizado Correctamente',
            `${resp.name}`
          );
        });
    }

    loadId() {
      return this._activateRoute.params.subscribe((params) => {
        this.id = params['id'];
      });
    }

    loadData() {
      return this._localesService.getLocalesById(this.id, this.token).subscribe(
        (local) => {
          delete local.id;
          this.forma.setValue({ ...local });
        },
        (err) => (this.error = err)
      );
    }
}
