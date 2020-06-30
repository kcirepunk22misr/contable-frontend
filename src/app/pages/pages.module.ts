// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppPagesRouting } from './pages.routes';

// Components
import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';

@NgModule({
  declarations: [PagesComponent, ClientesComponent],
  imports: [CommonModule, SharedModule, AppPagesRouting],
})
export class PagesModule {}
