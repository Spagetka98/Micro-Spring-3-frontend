import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
    selector: 'app-navbar-layout',
    template: `
  <div class="min-vh-100 d-flex flex-column">
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  </div>
  `,
    styles: [],
    standalone: true,
    imports: [RouterOutlet, NavbarComponent]
})
export class NavbarLayoutComponent {

}
