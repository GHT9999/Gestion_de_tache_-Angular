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
    return this.http.post(`${this.baseUrl}/signin`, authRequest);
  }

  getDecodedRole(token: string | null): string | null {
    if (!token) {
      console.error('Token is null or undefined.');
      return null;
    }
  
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
  
      // Extract roles from the decoded token
      const rolesArray = decodedToken?.roles || [];
      if (rolesArray.length > 0) {
        const role = rolesArray[0]?.authority || null; // Get the first role
        return role;
      } else {
        console.warn('No roles found in token.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
}
