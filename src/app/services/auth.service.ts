import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface SignupResponse {
  message: string;
  // Ajoute d'autres propriétés si nécessaire
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/auth'; // Update with your backend URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // Signup method
  signUp(user: any): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}/signup`, user);
  }

  // Signin method
  signIn(authRequest: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, authRequest);
  }

  getDecodedRole(token: string | null): string | null {
    if (!token) {
      console.error('Token is null or undefined.');
      return null;
    }
  
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
  
      // Adjust for 'userRole' as defined in the backend payload
      const role = decodedToken?.userRole || null; 
      console.log('Extracted Role:', role);
      return role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  
  
  }
}
