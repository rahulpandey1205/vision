import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
  template: `
    <router-outlet></router-outlet>   <!-- ✅ Main content area -->
  `
})
export class App {
  protected title = 'frontend';
}
