import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { Notfound404Component } from '../notfound404/notfound404.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: PagesComponent,
    children: [
      { path: '', component: ClientesComponent },
      { path: '**', pathMatch: 'full', component: Notfound404Component },
    ],
  },
];

export const AppPagesRouting = RouterModule.forChild(routes);
