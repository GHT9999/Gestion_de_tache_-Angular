import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent {
  user = {
    username: '',
    email: '',
    password: '',
    role: 'USER', // Default role is USER
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    
  
    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        alert(response.message); // Display the success message
        this.router.navigate(['/dashboard']); // Redirect to login page
      },
      error: (error) => {
        this.errorMessage = 'Une erreur est survenue lors de l’inscription.';
        console.error(error);
      },
    });
  }
}
