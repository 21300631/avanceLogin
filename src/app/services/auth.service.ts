import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth.service.ts
private apiUrl = 'http://localhost:3000/api/auth'; // ← Ya incluye /auth


  constructor(private http: HttpClient, private router: Router) {}

  register(nombre: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { // ← Quita el /auth extra
      nombre,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }



  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
