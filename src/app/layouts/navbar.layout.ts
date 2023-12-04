import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-layout',
  template: `
  <div class="min-vh-100 d-flex flex-column">
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class NavbarLayoutComponent {

}
