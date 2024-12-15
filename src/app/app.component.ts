import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SignInComponent, SignUpComponent],  // Import RouterModule
  template: `
    <h1>Task Management</h1>
    <nav>
      <a routerLink="/signin">Sign In</a>
      <a routerLink="/signup">Sign Up</a>
    </nav>
    <router-outlet></router-outlet>  <!-- The components will be loaded here -->
  `,
})
export class AppComponent {
  title = 'gestion-taches';
}
