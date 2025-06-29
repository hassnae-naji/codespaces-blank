import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthService) {} // Inject AuthService

  logout() {
    this.authService.logout();
  }
}
