import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { NavbarComponent } from '../user-navbar/user-navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';
import { ProjectResponse } from '../../../models/project/project-response.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';  // Ensure this is present
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule,FormsModule ,RouterModule ], 
  standalone: true, // Import NavbarComponent
})
export class UserDashboardComponent implements OnInit {
  projects: ProjectResponse[] = [];
  userId: number | null = null; // Declare userId

  constructor(private userService: UserService , private router : Router , private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProjects(); // Automatically load projects when component initializes
    this.userId = this.authService.getUserIdFromToken();
    console.log('Extracted User ID from Token:', this.userId);
  }

  loadProjects(): void {
    this.userService.getProjectsForUser().subscribe({
      next: (data) => {
        console.log('Projects loaded:', data);
        this.projects = data;

      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      },
    });
  }

  viewProject(projectId: number): void {
    if (projectId) {
        this.router.navigate(['/user/project', projectId])
      .then(() => console.log(`Navigated to project ${projectId}`))
      .catch(err => console.error('Navigation error:', err));
      } else {
        console.error('Invalid Project ID');
      }
  }
  ProjectPage (projectId: number): void {
    if (projectId) {
        this.router.navigate(['/user/project-dashboard', projectId])
      .then(() => console.log(`Navigated to project ${projectId}`))
      .catch(err => console.error('Navigation error:', err));
      } else {
        console.error('Invalid Project ID');
      }
  }
  
}
