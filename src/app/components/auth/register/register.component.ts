import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  
  onRegister() {
    this.errorMessage = ''; // Limpia errores previos
    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.authService.login(this.email, this.password).subscribe({
          next: (loginResponse) => {
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('user', JSON.stringify(loginResponse.user));
            this.router.navigate(['/productos']);
          },
          error: (loginError) => {
            this.errorMessage = 'Inicio de sesión fallido. Por favor inicia sesión manualmente.';
            this.router.navigate(['/login']); // Redirige a login si falla
          }
        });
      },
      error: (err) => {
        console.error('Error en registro:', err);
        this.errorMessage = err.error?.message || 'Error al registrar. Verifica tus datos.';
      }
    });
  }



}
