import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  dateInscription: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8082/api/user'; // URL du backend

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/users`);
  }

  searchUsersByName(name: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/Userbyname/${name}`);
  }

  getAllUserEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/UsersMail`);
  }
}
