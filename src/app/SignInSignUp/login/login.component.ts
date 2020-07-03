import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  public forma: FormGroup;
  public error: string = null;

  constructor(
    private fb: FormBuilder,
    private _useService: UserService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnDestroy() {
    this.login().unsubscribe();
  }

  createForm() {
    this.forma = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validateForm(name: string) {
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  login() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    return this._useService.login(this.forma.value).subscribe(
      () => {
        this._router.navigate(['/contable/user']);
      },
      () => {
        this.toastr.error(
          'Usuario y/o Contrasela invalido!!',
          'Credenciales Incorretas!!'
        );
      }
    );
  }
}
