import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { Notfound404Component } from '../notfound404/notfound404.component';
import { AuthGuard } from '../guards/auth.guard';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { LocalesComponent } from './locales/locales.component';
import { ListarLocalesComponent } from './listar-locales/listar-locales.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';

const routes: Routes = [
  {
    path: 'contable',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: ClientesComponent },
      { path: 'users', component: ListarClientesComponent },
      { path: 'update-user/:id', component: ClientesComponent },
      { path: 'local', component: LocalesComponent },
      { path: 'locales', component: ListarLocalesComponent },
      { path: 'update-local/:id', component: LocalesComponent },
      { path: 'generar-factura/:id', component: GenerarFacturaComponent },
      { path: '**', pathMatch: 'full', component: Notfound404Component },
    ],
  },
];

export const AppPagesRouting = RouterModule.forChild(routes);
