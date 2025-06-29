import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject AuthService

  login() {
    this.errorMessage = ''; // Clear previous error messages
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Navigation is handled by AuthService on successful login
        console.log('Login successful');
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });
  }
}
