import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-empty-layout',
  template: '<router-outlet></router-outlet>',
  styles: [],
  standalone: true,
  imports: [RouterOutlet]
})
export class EmptyLayoutComponent {

}
