import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project/project.service';
import { ProjectResponse } from '../../../models/project/project-response.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamService } from '../../../services/team/team.service'; // Import TeamService
import { TeamDto } from '../../../models/team/teamDto.model';

@Component({
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectId: number = 0;
  project: ProjectResponse = {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    owner: null,
  };
  newTeamName: string = '';
 // Ensure `newTeamName` is initialized
  newTeam: TeamDto = {
    id: 0, // The backend will generate this
    name: this.newTeamName.trim(),
    dateCreation: new Date(), // You can pass the current date or let the backend handle it
    projectId: this.projectId,
    projectName: this.project.name,
    users: [], // Empty user list initially
  };
  isLoading: boolean = true;
  errorMessage: string = '';
  projectUsers: string[] = []; // Define projectUsers
  projectTeams: any[] = []; // Define projectTeams
  newUserEmail: string = ''; // Define newUserEmail
  


  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private teamService: TeamService, // Inject TeamService
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/sign-in']); // Redirect to login if no token
    } else {
      const projectIdFromRoute = this.route.snapshot.paramMap.get('projectId');
      this.projectId = projectIdFromRoute ? +projectIdFromRoute : 0;
  
      if (this.projectId > 0) {
        this.fetchProjectDetails();  // Fetch project details
        this.loadProjectUsers();    // Fetch project users
      }
    }
  }
  

  fetchProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (data) => {
        this.project = data;
  
        // Ensure startDate and endDate are initialized
        if (!this.project.startDate) {
          this.project.startDate = new Date();
        }
        if (!this.project.endDate) {
          this.project.endDate = new Date();
        }
  
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching project:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load project details.';
      },
    });
  }
  

  onUpdateProject(): void {
    if (this.project.endDate && this.project.startDate && this.project.endDate < this.project.startDate) {
      console.error("End date cannot be before the start date.");
      return;
    }
    
  
    this.projectService.updateProject(this.projectId, this.project).subscribe({
      next: () => {
        alert('Project updated successfully!');
      },
      error: (err) => {
        console.error('Error updating project:', err);
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Failed to update project. Please check your input.');
        }
      },
    });
  }
  
  

  loadProjectUsers(): void {
    this.projectService.getProjectUsers(this.projectId).subscribe({
      next: (users) => {
        this.projectUsers = users || []; // Assign empty array if `users` is null/undefined
      },
      error: (error) => {
        this.errorMessage = 'Error loading project users.';
        console.error('Error loading users:', error);
      },
    });
  }
  

  loadProjectTeams(): void {
    this.teamService.getTeamsForProject(this.projectId).subscribe({
      next: (teams: any[]) => {
        this.projectTeams = teams;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading project teams:', err);
      },
    });
  }

  addUserToProject(): void {
    if (!this.newUserEmail.trim()) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }
  
    this.projectService.addUserToProjectByEmail(this.projectId, this.newUserEmail).subscribe({
      next: () => {
        this.loadProjectUsers(); // Reload the project users
        this.newUserEmail = ''; // Clear the input field
        this.errorMessage = ''; // Clear any existing error messages
      },
      error: (err) => {
        console.error('Error adding user to project:', err);
        this.errorMessage = 'Error adding user';
      },
    });
  }
  
  

  removeUserFromProject(userEmail: string): void {
    this.projectService.removeUserFromProjectByEmail(this.projectId, userEmail).subscribe({
      next: () => {
        this.loadProjectUsers(); // Reload the list of project users
        this.errorMessage = ''; // Clear any existing error messages
      },
      error: (err) => {
        console.error('Error removing user from project:', err);
        this.errorMessage = 'Error removing user';
      },
    });
  }
  
  addTeamToProject(): void {
    if (!this.newTeamName.trim()) {
      this.errorMessage = 'Please enter a valid team name';
      return;
    }
  
    // Create the new team object
    const newTeam: TeamDto = {
      id: 0, // The backend will generate this
      name: this.newTeamName.trim(),
      dateCreation: new Date(), // You can pass the current date or let the backend handle it
      projectId: this.projectId,
      projectName: this.project.name,
      users: [], // Empty user list initially
    };
  
    // Call the service to create the team
    this.teamService.createTeam(this.projectId, newTeam).subscribe({
      next: () => {
        this.loadProjectTeams(); // Refresh the list of teams
        this.newTeamName = '';  // Reset the input field
        this.errorMessage = ''; // Clear any error messages
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error adding team to project:', err);
        this.errorMessage = 'Error adding team';
      },
    });
  }
  
  
  
  removeTeamFromProject(teamId: number): void {
    this.teamService.deleteTeam(this.projectId, teamId).subscribe({
      next: () => {
        this.loadProjectTeams();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing team from project:', err);
        this.errorMessage = 'Error removing team';
      },
    });
  }

  viewTeam(teamId: number): void {
    this.router.navigate([`/user/team-management/${this.projectId}/${teamId}`]);
  }
}
