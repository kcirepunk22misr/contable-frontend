// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppPagesRouting } from './pages.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { LocalesComponent } from './locales/locales.component';
import { ListarLocalesComponent } from './listar-locales/listar-locales.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';

@NgModule({
  declarations: [
    PagesComponent,
    ClientesComponent,
    ListarClientesComponent,
    LocalesComponent,
    ListarLocalesComponent,
    GenerarFacturaComponent,
  ],
  imports: [CommonModule, SharedModule, AppPagesRouting, ReactiveFormsModule],
})
export class PagesModule {}
