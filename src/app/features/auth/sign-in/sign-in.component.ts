import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  authRequest = {
    email: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    console.log('Auth Request:', this.authRequest); // Verify the input values
  
    this.authService.signIn(this.authRequest).subscribe({
      next: (response: { jwt: string }) => { // Updated to match 'jwt' field
        console.log('Login Success:', response);
        
        const token = response.jwt; // Correctly access the JWT
        localStorage.setItem('token', token);
  
        // Decode the token to extract the role
        const role = this.authService.getDecodedRole(token);
        console.log('Decoded Role:', role);
  
        // Redirect based on role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'NORMAL') {
          this.router.navigate(['/user']);
        } else {
          this.errorMessage = 'Unknown role. Please contact support.';
        }
      },
  
      error: (error: any) => {
        console.error('Login Error:', error);
        this.errorMessage = 'Invalid email or password.';
      },
    });
  }
  

}






