import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn(): void {
    this.authService.signIn(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Stocke le token (si présent) dans le localStorage
        localStorage.setItem('token', response.jwt);
        // Redirige l'utilisateur vers une autre page
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Invalid email or password.');
      },
    });
  }
}
