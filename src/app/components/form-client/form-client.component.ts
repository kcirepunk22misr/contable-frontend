import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locales } from '@interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
})
export class FormClientComponent implements OnInit {
  forma: FormGroup;
  localAndClient: Locales;

  constructor(
    private fb: FormBuilder,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      nit_number: ['', [Validators.required, Validators.pattern('[0-9- ]+')]],
      phone_number: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      address: ['', Validators.required],
    });
  }
}
