import { Component } from '@angular/core';
import { Navegacion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public routerLinkClient: Navegacion[] = [
    { name: 'Crear Clientes', url: '/contable/user' },
    { name: 'Lista De Clientes', url: '/contable/users' },
  ];

  public routerLinkLocal: Navegacion[] = [
    { name: 'Crear Local', url: '/contable/local' },
    { name: 'Lista De Locales', url: '/contable/locales' },
  ];

  constructor() {}
}
